import "../styles/globals.css";
import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import AuthProvider from "../src/contexts/AuthProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <AuthProvider auth={Component.auth}>
        {/* <Auth auth={Component.auth}> */}
        <Component {...pageProps} />
        {/* </Auth> */}
      </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
