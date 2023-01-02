import Head from "next/head";
import config from "../src/config";
import useAuth from "../src/hooks/useAuth";

const Home = () => {
  const { user, logout }: any = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{config.app.appName}</title>
        <meta name="description" content={config.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        Bievenidos {user?.name}
        <br />
        <button onClick={logout}>Logout</button>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Powered by Makroz
      </footer>
    </div>
  );
};

export default Home;

Home.auth = true;
