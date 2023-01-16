const config = {
  app: {
    appName: "Force One System",
    appDescription: "Force One System",
    appLogoImage: "/assets/images/logo/logo.png",
    API_URL: "http://localhost:8000/api",
    loginRedirect: "/",
  },
  auth: {
    login: "/admin-login",
    register: "/admin-register",
    logout: "/admin-logout",
    success: "/",
  },
  layout: {},
};

export default config;
