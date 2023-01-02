import { createContext } from "react";
import LoginBasic from "../components/auth/LoginBasic";
import Spinner from "../components/layouts/Spinner";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext({});
const AuthProvider = ({ children, auth }: any) => {
  const data = useAuth();
  //const instanceRef = useRef(axios.create(config));
  if (!data.loaded) {
    return <Spinner />;
  }
  if (auth && !data.user) {
    return (
      <AuthContext.Provider value={data}>
        <LoginBasic />
      </AuthContext.Provider>
    );
  }
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
