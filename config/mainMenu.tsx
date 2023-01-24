import { Home, Users, Settings } from "react-feather";
export const mainMenu = [
  {
    id: "dasboard",
    title: "Dashboard",
    icon: <Home />,
    link: "/",
    ability: "R",
  },
  {
    id: "users",
    title: "Usuarios",
    icon: <Users />,
    link: "/users",
    ability: "R",
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
    ability: "R",
    children: [
      {
        id: "levels",
        title: "Niveles",
        link: "/levels",
        ability: "R",
      },
      {
        id: "challenges",
        title: "Challenges",
        link: "/challenges",
        ability: "R",
      },
      {
        id: "task",
        title: "Tareas",
        link: "/tasks",
        ability: "R",
      },
      {
        id: "roles",
        title: "Roles",
        link: "/roles",
        ability: "R",
      },
      {
        id: "abilities",
        title: "Permisos",
        link: "/abilities",
        ability: "R",
      },
    ],
  },
];
