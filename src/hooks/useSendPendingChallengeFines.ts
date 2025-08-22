// src/hooks/useSendPendingChallengeFines.ts
import { useEffect, useRef } from "react";
import { supabase } from "@/supabaseClient";
import { useAuthContext } from "@/contexts/AuthContext";
import locales from "@/locales";

const PUSH_ENDPOINT = import.meta.env.VITE_PUSH_SERVER_URL;

export function useSendPendingChallengeFines(challenges: any[] = []) {
  const { user } = useAuthContext();
  const runningRef = useRef(false);

  useEffect(() => {
    if (!user) return;

    if (
      challenges.length &&
      !challenges.some((c) => c.status === "finished" && c.creator_id === user.id)
    ) return;

    if (runningRef.current) return;
    runningRef.current = true;

    const process = async () => {
      const { data: pendingFines, error } = await supabase
        .from("challenge_fines_candidates")
        .select("*")
        .eq("sender_id", user.id);

      if (error) {
        console.error("Error cargando multas pendientes:", error);
        runningRef.current = false;
        return;
      }
      if (!pendingFines?.length) {
        runningRef.current = false;
        return;
      }

      for (const fine of pendingFines) {
        // 1) Busca un COMPLETED (ganador) para este challenge
        const { data: winner } = await supabase
          .from("challenge_participants")
          .select("user_id")
          .eq("challenge_id", fine.challenge_id)
          .eq("completed", true)
          .neq("user_id", fine.recipient_id) // no puede ser el que paga
          .limit(1)
          .maybeSingle();

        if (!winner?.user_id) {
          console.warn("Sin ganador para challenge", fine.challenge_id);
          continue;
        }

        // 2) Trae su perfil para nombre/teléfono
        const { data: wProfile } = await supabase
          .from("users")
          .select("username, email, phone")
          .eq("id", winner.user_id)
          .maybeSingle();

        const winnerId = winner.user_id;
        const winnerName =
          wProfile?.username || wProfile?.email || fine.sender_name || "User";
        const winnerPhone = wProfile?.phone || "";

        // 3) Evita duplicado winner -> loser en ese challenge
        const { data: exists } = await supabase
          .from("fines")
          .select("id")
          .eq("sender_id", winnerId)
          .eq("recipient_id", fine.recipient_id)
          .eq("challenge_id", fine.challenge_id);

        if (exists?.length) continue;

        // 4) Idioma del receptor y motivo
        const { data: recipientData } = await supabase
          .from("users")
          .select("language")
          .eq("id", fine.recipient_id)
          .maybeSingle();
        const lang = recipientData?.language || "es";
        const locale = locales[lang] || locales["es"];
        const reason = locale.challengeCard.challengeNotCompleted
          .replace("{title}", fine.challenge_title || "Reto");

        // 5) Inserta la multa con sender = GANADOR
        const fineObj = {
          sender_id: winnerId,
          sender_name: winnerName,
          sender_phone: winnerPhone,
          recipient_id: fine.recipient_id,
          recipient_name: fine.recipient_name,
          recipient_email: fine.recipient_email,
          reason,
          amount: fine.amount,
          status: "pending",
          date: new Date().toISOString(),
          type: "challenge",
          challenge_id: fine.challenge_id,
        };

        const { error: insertError } = await supabase.from("fines").insert([fineObj]);
        if (insertError) {
          console.error("Error insertando multa:", insertError);
          continue;
        }

        // 6) Push al perdedor (mostrando al ganador como sender)
        function templateReplace(str: string, vars: Record<string, string | number>) {
          return str.replace(/{{(.*?)}}/g, (_, key) => String(vars[key.trim()] ?? ""));
        }
        const notifPayload = {
          title: locale.challengeCard.newFineRecived,
          body: templateReplace(locale.challengeCard.fineReceivedBody, {
            sender: winnerName,
            amount: fine.amount,
            reason,
          }),
          url: "/history",
        };

        const { data: pushSubs } = await supabase
          .from("push_subscriptions")
          .select("subscription")
          .eq("user_id", fine.recipient_id);

        const subs = (pushSubs || [])
          .map((s: any) => {
            try {
              return typeof s.subscription === "string"
                ? JSON.parse(s.subscription)
                : s.subscription;
            } catch { return null; }
          })
          .filter((s: any) => s && s.endpoint && s.keys?.auth && s.keys?.p256dh);

        for (const subscription of subs) {
          try {
            await fetch(PUSH_ENDPOINT, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subs: subscription, notif: notifPayload }),
            });
          } catch (err) {
            console.error("Error enviando push:", err);
          }
        }
      }

      runningRef.current = false;
    };

    process();
    const interval = setInterval(process, 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [user, JSON.stringify(challenges)]);
}
