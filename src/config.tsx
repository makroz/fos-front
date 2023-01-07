// Logo Import
import logo from "../public/assets/images/logo/logo.png";

// You can customize the template with the help of this file

//Template config options
const config = {
  app: {
    appName: "Force One System",
    appDescription: "Force One System",
    appLogoImage: logo,
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
