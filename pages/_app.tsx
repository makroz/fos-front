import "../styles/globals.css";
import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import Auth from "../src/components/auth/Auth";
import AuthProvider from "../src/contexts/AuthProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <AuthProvider>
        <Auth>
          <Component {...pageProps} />
        </Auth>
        </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
