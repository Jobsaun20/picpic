export const es = {
  // Header
  app: {
    name: "Pic",
    subtitle: "Entre amigos"
  },
  
// Index Page
  index: {
    hola: "¡Hola",
    level: "Nivel",
    noinsignias: "Sin insignias",
    lastFineRecived: "Última multa recibida",
    pendent: "Pendiente",
    pendents: "Pendientes",
    de: "De",
    payed: "Pagada",
    congrats: "¡Enhorabuena!",
    noPendentFines: "No tienes multas pendientes",
    continueLikeThis: "Mantén este buen comportamiento",
    quickActions: "Acciones rápidas",
    quickQuickActionsDescription: "Gestiona tus multas de forma eficiente",
    recivedFines: "Multas recibidas",
    recentRecivedFines: "Multas recibidas recientes",
    noRecivedFines: "No has recibido multas",
    seeAllRecivedFines: "Ver todas las multas recibidas",
    recentInsignias: "Insignias recientes",
    recentHitos: "Tus logros más recientes",
    seeAllInsignias: "Ver todas las insignias",
  },

  // Contacts Page
  contacts: {
    error: "Error",
    errorDescription: "El contacto seleccionado no está registrado como usuario. No se puede enviar la multa.",
    deletedContactConfirmed: "El contacto ha sido eliminado correctamente.",
    contactSearchPlaceholder: "Buscar contacto por nombre o email",
    loading: "Cargando...",
    addedContactConfirmed: "Contacto añadido correctamente",
  },

 // Groups Page
  groups: {
    notIdentifiedUser: "Usuario no identificado",
    theGroup: "El grupo",
    createdSuccessfully: "ha sido creado exitosamente",
    letTheGroup: "Has abandonado el grupo",
    groupDeleted: "El grupo ha sido eliminado.",
    updatedGroup: "Grupo actualizado correctamente",
    savedCorrectly: "Los cambios se han guardado correctamente",
    deletedMember: "Miembro eliminado",
    deletedMemberDescription: "El usuario ha sido eliminado del grupo",
    memberAdded: "Miembro añadido",
    memberAddedDescription: "El nuevo miembro ha sido añadido correctamente",
    contactNotFounError: "No se encontró el contacto registrado para este miembro.",
    groupNotFound: "Grupo no encontrado",
    notDeterminedUser: "No se pudo determinar el usuario a multar.",
    createFineError: "No se pudo crear la multa:",
    fineCreated: "Multa creada correctamente",
    fineSent: "Multa enviada correctamente",
    rules: "Reglas",
    members: "Miembros",
    sendFine: "Enviar multa",
    createGroupToStart: "Crea un grupo para empezar a gestionar multas entre amigos",
  },

// History Page
  history: {
    newFineReceived: "¡Nueva multa recibida!",
    newFineFrom: "Has recibido una nueva multa de",
    fineForAmount: "Multa de",
    correctlyPaid: "pagada correctamente",
    experienceUpdateError: "Error al actualizar la experiencia del usuario",
    xpUpdated: "Experiencia actualizada correctamente",
    xpGained: "¡Has ganado experiencia!",
    xpGainedDescription1: "Has ganado",
    xpGainedDescription2: "XP por tu acción.",
  },

  // Navigation & Actions
  nav: {
    notifications: "Notificaciones",
    profile: "Mi perfil",
    settings: "Configuración",
    logout: "Cerrar sesión",
    login: "Iniciar sesión",
    register: "Crear cuenta",
    invite: "Invitar amigos"
  },
  
  // Dashboard Stats
  stats: {
    pending: "Pendiente",
    pendingFines: "Multas pendientes",
    finesPending: "multas por pagar",
    issued: "Emitidas",
    issuedFines: "Multas emitidas",
    totalSent: "Total enviado",
    received: "Recibidas",
    receivedFines: "Multas recibidas",
    totalReceived: "Total recibido"
  },
  
  // Quick Actions
  quickActions: {
    title: "Acciones rápidas",
    description: "Gestiona tus multas sociales",
    newFine: "Nueva multa",
    contacts: "Contactos",
    myQR: "Mi QR",
    history: "Historial",
    notifications: "Notificaciones"
  },
  
  // Fines List
  fines: {
    title: "Mis multas",
    description: "Gestiona tus multas recibidas y enviadas",
    from: "De",
    to: "A",
    paid: "Pagada",
    pending: "Pendiente",
    pay: "Pagar",
    payFine: "Pagar multa",
    finePaid: "¡Multa pagada!",
    noReceived: "No tienes multas recibidas",
    noSent: "Aún no has enviado ninguna multa",
    phone: "Teléfono"
  },
  
  // Create Fine Modal
  createFine: {
    title: "Crear nueva multa",
    description: "Crea una multa social para enviar a un amigo o familiar",
    reason: "Motivo de la multa",
    reasonPlaceholder: "Ej.: Llegar tarde a cenar, olvidar comprar pan...",
    amount: "Importe (CHF)",
    amountPlaceholder: "25.00",
    recipientType: "Tipo de destinatario",
    contact: "Contacto",
    email: "Correo electrónico",
    selectContact: "Seleccionar contacto",
    selectContactPlaceholder: "Selecciona un contacto",
    recipientEmail: "Correo del destinatario",
    recipientEmailPlaceholder: "amigo@ejemplo.com",
    cancel: "Cancelar",
    create: "Crear multa",
    created: "¡Multa creada!",
    sentTo: "Multa de {amount} CHF enviada a {recipient}",
    seeAndManageContacts: "Ver y gestionar contactos",
    seeHistoryComplete: "Ver historial completo",
    manageGroups: "Gestionar grupos",
    groups: "Grupos",
    errors: {
      complete: "Por favor, completa todos los campos obligatorios",
      selectRecipient: "Por favor, selecciona un destinatario",
      validEmail: "Introduce un correo válido"
    }
  },
  
  // Payment Modal
  payment: {
    title: "Pagar multa - {amount} CHF",
    description: "Paga tu multa usando TWINT escaneando el código QR o usando el número",
    details: "Detalles de la multa",
    reason: "Motivo:",
    sender: "Remitente:",
    amount: "Importe:",
    options: "Opciones de pago TWINT",
    scanQR: "Escanea con tu app TWINT",
    useNumber: "O usa el número TWINT:",
    copied: "Copiado",
    numberCopied: "Número de TWINT copiado al portapapeles",
    markPaid: "Marcar como pagada",
    processing: "Procesando...",
    confirmed: "¡Pago confirmado!"
  },
  
  // User Profile
  profile: {
    title: "Mi perfil",
    description: "Actualiza tu información personal y configura tu método de pago TWINT",
    changePhoto: "Cambiar foto",
    personalInfo: "Información personal",
    fullName: "Nombre completo",
    phone: "Teléfono",
    twintConfig: "Configuración de TWINT",
    uploadQR: "Sube tu código QR de TWINT",
    uploadButton: "Subir QR",
    qrDescription: "Este QR se mostrará cuando alguien deba pagarte una multa",
    save: "Guardar cambios",
    updated: "Perfil actualizado",
    updateDescription: "Tus datos se han guardado correctamente",
    twintUpload: "TWINT QR",
    twintUploadDescription: "Función para subir QR próximamente",
    updatedProfile: "Perfil actualizado",
    deleteAccountError: "Error al eliminar la cuenta",
    deleteAccountDescription: "No se pudo eliminar la cuenta. Contacta con soporte.",
    accountDeleted: "Cuenta eliminada correctamente",
    accountDeletedDescription: "Tu cuenta y todos tus datos han sido eliminados correctamente.",
    goBack: "Volver",
    noName: "Sin nombre",
    editProfile: "Editar perfil",
    accountManagement: "Gestión de cuenta",
    endSession: "Cerrar sesión",
    deleteAccount: "Eliminar cuenta",
    insignias: "Insignias",
    confirmDeleteAccount: "¿Eliminar cuenta?",
    confirmDeleteAccountDescription: "Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, multas e historial de la aplicación.",
    Cancel: "Cancelar",
    deleteAccountButton: "Eliminar cuenta",
  },
  
  // Auth
  auth: {
    login: "Iniciar sesión",
    register: "Crear cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    fullName: "Nombre completo",
    loginButton: "Entrar",
    registerButton: "Crear cuenta",
    forgotPassword: "¿Olvidaste la contraseña?",
    noAccount: "¿No tienes cuenta?",
    hasAccount: "¿Ya tienes una cuenta?",
    signUp: "Regístrate aquí",
    signIn: "Inicia sesión aquí",
    loginSuccess: "¡Bienvenido de nuevo!",
    registerSuccess: "¡Cuenta creada exitosamente!",
    errors: {
      emailRequired: "El correo electrónico es obligatorio",
      passwordRequired: "La contraseña es obligatoria",
      passwordMatch: "Las contraseñas no coinciden",
      invalidEmail: "Correo electrónico inválido",
      weakPassword: "La contraseña debe tener al menos 6 caracteres"
    }
  },
  
  // Pages
  pages: {
    contacts: {
      title: "Contactos",
      description: "Gestiona tu lista de contactos",
      addContact: "Agregar contacto",
      addContactButton: "Agregar contacto",
      noContacts: "Aún no tienes contactos",
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono",
      edit: "Editar",
      delete: "Eliminar",
      fine: "Multa",
      save: "Guardar",
      cancel: "Cancelar",
      editContact: "Editar contacto",
      deleteContact: "Eliminar contacto",
      deleteConfirmation: "¿Seguro que deseas eliminar este contacto?",
      contactAdded: "Contacto añadido",
      contactUpdated: "Contacto actualizado",
      contactDeleted: "Contacto eliminado"
    },
    groups: {
      title: "Grupos",
      description1: "Gestiona tus grupos",
      createGroup: "Crear grupo",
      joinGroup: "Unirse a un grupo",
      noGroups: "Aún no tienes grupos",
      groupName: "Nombre del grupo",
      description: "Descripción",
      members: "Miembros",
      admin: "Admin",
      member: "Miembro",
      leave: "Salir",
      delete: "Eliminar",
      invite: "Invitar",
      manage: "Gestionar",
      code: "Código",
      enterCode: "Ingresa el código del grupo",
      join: "Unirse",
      create: "Crear",
      groupCreated: "Grupo creado",
      joinedGroup: "Te has unido al grupo",
      leftGroup: "Has salido del grupo",
      groupDeleted: "Grupo eliminado"
    },
    settings: {
      title: "Configuración",
      description: "Configura la app",
      language: "Idioma",
      notifications: "Notificaciones",
      privacy: "Privacidad",
      about: "Acerca de",
      version: "Versión",
      enableNotifications: "Activar notificaciones",
      enableSounds: "Activar sonidos",
      privateProfile: "Perfil privado",
      dataExport: "Exportar datos",
      deleteAccount: "Eliminar cuenta",
      settingsSaved: "Configuración guardada"
    },
    myQR: {
      title: "Mi código QR",
      description: "Comparte tu código QR para recibir multas",
      downloadQR: "Descargar QR",
      shareQR: "Compartir QR"
    },
    history: {
      title: "Historial",
      description: "Historial completo de multas",
      filter: "Filtrar",
      all: "Todas",
      sent: "Enviadas",
      received: "Recibidas",
      paid: "Pagadas",
      pending: "Pendientes",
      noResults: "Sin resultados",
      noResultsDescription: "No se encontraron multas con los filtros seleccionados",
      viewAll: "Ver todo",
      total: "Total"
    },
    notifications: {
      title: "Notificaciones",
      description: "Tus notificaciones recientes",
      markAllRead: "Marcar todas como leídas",
      noNotifications: "No tienes notificaciones",
      fine_received: "{{sender}} te ha enviado una multa de {{amount}} CHF por \"{{reason}}\"",
      payment_received: "{{sender}} ha pagado tu multa de {{amount}} CHF",
      group_invite: "{{sender}} te ha invitado al grupo \"{{group}}\"",
      lessThanHour: "Hace menos de 1 hora",
      hoursAgo: "Hace {hours} horas",
      daysAgo: "Hace {days} días",
      marked: "Notificaciones marcadas",
      allRead: "Todas las notificaciones han sido marcadas como leídas",
      emptyMessage: "Cuando tengas notificaciones, aparecerán aquí",
      newRuleProposed: "Nueva regla propuesta",
    }
  },
  
  // Invite
  invite: {
    title: "Invitar amigos",
    description: "Invita a tus amigos a usar Pic",
    shareText: "¡Únete a Pic y gestiona multas sociales entre amigos! 🎉",
    copyLink: "Copiar enlace",
    linkCopied: "¡Enlace copiado!",
    sendInvite: "Enviar invitación"
  },
  
  // Achievements
  achievements: {
    title: "¡Logro desbloqueado!",
    close: "Cerrar",
    xpGained: "Puntos de experiencia ganados",
    levelUp: "¡Subiste de nivel!",
    newBadge: "¡Nueva insignia!"
  },
  
  // Common
  common: {
    currency: "CHF",
    required: "*",
    ok: "OK",
    cancel: "Cancelar",
    save: "Guardar",
    close: "Cerrar",
    edit: "Editar",
    delete: "Eliminar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    download: "Descargar",
    share: "Compartir",
    total: "Total",
  }
};
