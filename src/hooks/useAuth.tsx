import useAxios from "./useAxios";
import { useState, useEffect } from "react";

const useAuth = () => {
  const { data, error, loaded, execute } = useAxios();
  const [user, setUser] = useState<any>(null);

  const getUser = () => {
    let currentUser = null;
    if (!user){
      console.log("====================================");
      console.log("No user");
      console.log("====================================");
    }
    try {
      currentUser = user || JSON.parse(localStorage.getItem("token") + "").user;
    } catch (e) {
      currentUser = null;
    }
    setUser(currentUser);
  };

  const login = async (credentials: any) => {
    setUser(null);

    const {
      data,
      error,
    }: any = await execute("/admin-login", "POST", credentials);
    
    if (data.data.status === "ok") {
      console.log("Loguedo", data);
      setUser(data?.data?.user);
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.data.token, user: data.data.user })
      );
      return { user: data.data.user };
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data.data.errors };
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    const {
      data,
      error,
    }: any = await execute("/admin-logout", "POST");

    if (data?.data?.status === "ok") {
      console.log("Logout", data);
      return;
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data?.data?.errors };
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, error, loaded, login, logout };
};

export default useAuth;
