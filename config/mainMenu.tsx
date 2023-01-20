import { Home, Users, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
  },
  {
    id: "users",
    title: "Usuarios",
    icon: <Users />,
    link: "/users",
  },
  {
    id: "separator",
    type: "separator",
  },
  {
    id: "setting",
    title: "Config",
    icon: <Settings />,
    link: "/setting",
    children: [
      {
        id: "levels",
        title: "Niveles",
        link: "/levels",
      },
      {
        id: "challenges",
        title: "Challenges",
        link: "/challenges",
      },
      {
        id: "task",
        title: "Tareas",
        link: "/tasks",
      },
      {
        id: "roles",
        title: "Roles",
        link: "/roles",
      },
      {
        id: "abilities",
        title: "Permisos",
        link: "/abilities",
      },
    ],
  },
];
