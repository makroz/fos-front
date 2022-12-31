import { createContext} from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext({});
const AuthProvider = ({children}: any) => {
    const data = useAuth();
    //const instanceRef = useRef(axios.create(config));
  
  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
