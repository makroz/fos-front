import Head from "next/head";
import Image from "next/image";
import config from "../config/config";
import useAuth from "../src/hooks/useAuth";
import fondo from "../public/assets/images/fondo.png";
import useAxios from "../src/hooks/useAxios";
import { Card } from "flowbite-react";
import { Users } from "react-feather";

const Home = () => {
  const { user, userCan }: any = useAuth("home", "R");
  const { data: tasks } = useAxios("tasks-today", "GET");
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-2">
      <Head>
        <title>{config.app.appName}</title>
        <meta name="description" content={config.app.appDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold text-primary">Bienvenido</h1>
        {userCan("home_adm", "R") && (
          <>
            <h2 className="text-primary">Admin {user.name}</h2>
            <Image src={fondo} alt="dashboard" className="m-5" />
          </>
        )}
        {userCan("home_ins", "R") && (
          <>
            <h2 className="text-primary">Instructor {user.name}</h2>
            Sesiones para Hoy: <br />
            <Card>
              {tasks?.data?.map((task: any) => (
                <div key={task.challenge_id}>
                  <div className="text-red-700 font-bold">{task.to_date}</div>
                  <hr />
                  <h1>{task.challenge.name}</h1>
                  {task.challenge.description}
                  <hr />
                  <div className="m-2 flex justify-center gap-2 text-gray-500">
                    <Users size="22px" />
                    {task.cant}
                  </div>
                  <div className="btn btn-primary"> Habilitar Sala </div>
                </div>
              ))}
            </Card>
          </>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Copyrigth {new Date().getFullYear()} - {config.app.appName}
      </footer>
    </div>
  );
};

export default Home;
