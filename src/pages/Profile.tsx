import { useState, useEffect } from "react";
import { getSupabaseFunctionUrl } from "@/utils/getSupabaseFunctionUrl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";
import { EditProfileModal } from "@/components/EditProfileModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Award, Users, QrCode, TrendingUp, Trophy, Edit, ArrowLeft, LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calculateLevel, getXPProgress } from "@/utils/gamification";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/supabaseClient";

const rewards = [
  { icon: "🎯", title: "Precisión", description: "Multas justas y bien fundamentadas" },
  { icon: "🤝", title: "Buen Compañero", description: "Pagos rápidos y sin complicaciones" },
  { icon: "⚡", title: "Velocidad", description: "Respuesta rápida a multas" },
  { icon: "🏆", title: "Liderazgo", description: "Gestión efectiva de grupos" }
];

export default function Profile() {
  const { t, language } = useLanguage(); // language añadido aquí
  const { toast } = useToast();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { profile, loading, error, updateProfile } = useUserProfile();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // ---- NUEVO: Estados para insignias reales ----
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [badgesLoading, setBadgesLoading] = useState(true);

  // Si es nuevo, todos los campos vacíos
  const user = profile || {
    username: "",
    email: "",
    avatar_url: "",
    xp: 0,
    level: 1,
    badges: [],
    groups: [],
    achievements: [],
    totalSent: 0,
    totalReceived: 0,
    totalPaid: 0,
    totalEarned: 0,
    twintQR: ""
  };

  const currentLevel = calculateLevel(user.xp);
  const progressToNextLevel = getXPProgress(user.xp);

  // ---- NUEVO: Fetch de insignias del usuario ----
  useEffect(() => {
    const fetchUserBadges = async () => {
      if (!profile?.id) {
        setEarnedBadges([]);
        setBadgesLoading(false);
        return;
      }
      setBadgesLoading(true);

      // 1. Obtener user_badges del usuario
      const { data: userBadges, error } = await supabase
        .from("user_badges")
        .select("badge_id, achieved_at")
        .eq("user_id", profile.id);

      if (error) {
        setBadgesLoading(false);
        setEarnedBadges([]);
        return;
      }
      if (!userBadges || userBadges.length === 0) {
        setEarnedBadges([]);
        setBadgesLoading(false);
        return;
      }

      // 2. Obtener datos de badges
      const badgeIds = userBadges.map((b) => b.badge_id);
      const { data: badgesData } = await supabase
        .from("badges")
        .select("*")
        .in("id", badgeIds);

      // 3. Juntar info y asegurar que name/description es JSON
      const joined = userBadges
        .map((ub) => {
          const badge = badgesData.find((b) => b.id === ub.badge_id) || {};
          // Asegurarse de que name y description son objetos
          let name = badge.name;
          let description = badge.description;
          try {
            if (typeof name === "string") name = JSON.parse(name);
            if (typeof description === "string") description = JSON.parse(description);
          } catch {}
          return {
            ...badge,
            name,
            description,
            achieved_at: ub.achieved_at,
          };
        })
        .filter((b) => b.id);

      setEarnedBadges(joined);
      setBadgesLoading(false);
    };

    fetchUserBadges();
  }, [profile?.id]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Guardar perfil
  const handleSaveProfile = async (updatedUser) => {
    await updateProfile({
      username: updatedUser.name,
      avatar_url: updatedUser.avatar_url,
    });
    toast({ title: t.profile.updatedProfile });
    setIsEditProfileOpen(false);
  };

  // Logout real
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Eliminar cuenta real (Edge Function)
  const handleDeleteAccount = async () => {
    if (!profile?.id) return;

    // Obtenemos el access_token de sesión con Supabase v2
    const { data } = await supabase.auth.getSession();
    const access_token = data.session?.access_token;

    const endpoint = getSupabaseFunctionUrl("delete-user");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token || ""}`,
      },
      body: JSON.stringify({ user_id: profile.id }),
    });

    if (!res.ok) {
      const result = await res.json().catch(() => null);
      toast({
        title: t.profile.deleteAccountError,
        description: result?.error || t.profile.deleteAccountDescription,
        variant: "destructive",
      });
      return;
    }

    // Logout y feedback
    await logout();
    toast({
      title: t.profile.accountDeleted,
      description: t.profile.accountDeletedDescription,
    });
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [error, toast]);

  if (loading) return <div className="text-center py-16">{t.contacts.loading}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">

        {/* Volver atrás móvil */}
        <div className="md:hidden mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.profile.goBack}
          </Button>
        </div>

        {/* Cabecera de perfil */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                    {user.username?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {user.username
                    ? user.username
                    : <span>
                        {t.profile.noName}{" "}
                        <span className="text-xs text-blue-600 cursor-pointer underline ml-1"
                              onClick={() => setIsEditProfileOpen(true)}>
                          ({t.profile.editProfile})
                        </span>
                      </span>
                  }
                </h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {t.index.level} {currentLevel}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {user.xp} XP
                  </Badge>
                </div>

                {/* Insignias recientes */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                  {earnedBadges.slice(0, 2).map((badge) => (
                    <Badge key={badge.id} variant="secondary" className={getRarityColor(badge.rarity)}>
                      {badge.icon} {badge.name?.[language] || badge.name?.en || "Sin nombre"}
                    </Badge>
                  ))}
                </div>

                <div className="flex-1 min-w-48 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{progressToNextLevel.current} XP</span>
                    <span>{t.index.level} {currentLevel + 1}</span>
                  </div>
                  <Progress value={progressToNextLevel.percentage} className="h-2" />
                </div>

                {/* Botón Editar */}
                <Button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t.profile.editProfile}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones de cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>{t.profile.accountManagement}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.profile.endSession}
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t.profile.deleteAccount}
            </Button>
          </CardContent>
        </Card>

        {/* Insignias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {t.profile.insignias}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {badgesLoading ? (
              <div className="text-gray-400">{t.profile.loadingBadges || "Cargando insignias..."}</div>
            ) : earnedBadges.length === 0 ? (
              <div className="text-gray-400">{t.profile.noBadges || "Aún no tienes insignias"}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{badge.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {badge.name?.[language] || badge.name?.en || "Sin nombre"}
                        </h3>
                        <Badge variant="secondary" className={getRarityColor(badge.rarity)}>
                          {badge.rarity || ""}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {badge.description?.[language] || badge.description?.en || "Sin descripción"}
                    </p>
                    <div className="text-xs text-gray-400 mt-2">
                      {badge.achieved_at && `Obtenida: ${new Date(badge.achieved_at).toLocaleDateString()}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal editar perfil */}
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onSave={handleSaveProfile}
        />

        {/* Confirmación de borrado */}
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.profile.confirmDeleteAccount}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.profile.confirmDeleteAccountDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.profile.Cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700"
              >
                {t.profile.deleteAccountButton}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
