import { Home, Users, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
    abilities: ["R"],
  },
  {
    id: "users",
    title: "Usuarios",
    icon: <Users />,
    link: "/users",
    abilities: ["R"],
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
    abilities: ["R"],
    children: [
      {
        id: "levels",
        title: "Niveles",
        link: "/levels",
        abilities: ["R"],
      },
      {
        id: "challenges",
        title: "Challenges",
        link: "/challenges",
        abilities: ["R"],
      },
      {
        id: "task",
        title: "Tareas",
        link: "/tasks",
        abilities: ["R"],
      },
      {
        id: "roles",
        title: "Roles",
        link: "/roles",
        abilities: ["R"],
      },
      {
        id: "abilities",
        title: "Permisos",
        link: "/abilities",
        abilities: ["R"],
      },
    ],
  },
];
