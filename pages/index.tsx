import Head from "next/head";
import Image from "next/image";
import config from "../config/config";
import useAuth from "../src/hooks/useAuth";
import fondo from "../public/assets/images/fondo.png";
import useAxios from "../src/hooks/useAxios";
import { Card } from "flowbite-react";
import { Users } from "react-feather";
import DataModal from "../src/components/DataModal";
import { useState } from "react";
import Input from "../src/components/forms/Input";

const Home = () => {
  const { user, userCan }: any = useAuth("home", "R");
  const { data: tasks, execute, reLoad } = useAxios("tasks-today", "GET");
  const [openModal, setOpenModal] = useState(false);
  const [meet_link, setMeet_link] = useState("");
  const [errors, setErrors] = useState({});
  const [taskActive, setTaskActive]: any = useState({});

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onOpenModal = (task: any) => {
    setTaskActive(task);
    setOpenModal(true);
  };
  const onChange = (e: any) => {
    setMeet_link(e.target.value);
  };
  const validate = () => {
    const errors: any = {};
    if (!meet_link) {
      errors.meet_link = "El link es requerido";
    }
    if (!meet_link.match(/^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi)) {
      errors.meet_link = "El link no es valido";
    }

    return errors;
  };
  const onSave = () => {
    console.log(meet_link);
    setErrors({});
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setOpenModal(false);
    execute("tasks-today/" + taskActive.challenge_id, "POST", {
      meet_link,
      to_date: taskActive.to_date,
    });
    reLoad();
  };

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
                  <div
                    className={`font-bold ${
                      task.status == "A"
                        ? "text-red-700"
                        : task.status == "O"
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}
                  >
                    {task.to_date}
                  </div>
                  <hr />
                  <h1>{task.challenge.name}</h1>
                  {task.challenge.description}
                  <hr />
                  <div className="m-2 flex justify-center gap-2 text-gray-500">
                    <Users size="22px" />
                    {task.cant}
                  </div>
                  {!task.meet_link ? (
                    <div
                      className="btn btn-primary"
                      onClick={(e) => onOpenModal(task)}
                    >
                      Habilitar Sala
                    </div>
                  ) : (
                    <div>
                      {task.meet_link}
                      <hr />
                      <div className="btn btn-primary my-2">Ir a la Sala</div>
                      <div className="btn btn-secondary">Cerrar Sala</div>
                    </div>
                  )}
                  <DataModal
                    open={openModal}
                    title="Habilitar Sala"
                    onClose={onCloseModal}
                    onSave={onSave}
                    buttonText="Grabar"
                  >
                    <Input
                      label="Link de la Sala"
                      name="meet_link"
                      value={meet_link}
                      onChange={onChange}
                      error={errors}
                      type="text"
                    />
                  </DataModal>
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
