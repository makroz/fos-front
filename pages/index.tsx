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
  const onSave = async () => {
    console.log(meet_link);
    setErrors({});
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setOpenModal(false);
    await execute("tasks-today/" + taskActive.challenge_id, "POST", {
      meet_link,
      to_date: taskActive.to_date,
      cant: taskActive.cant,
    });
    reLoad();
  };

  const closeTask = async (task: any) => {
    await execute("lives-close/" + task.live.id, "POST");
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
      <main className="flex w-full flex-1 flex-col items-center justify-center p-0 text-center">
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
                  {task.live && (
                    <div className=" m-0 pb-2 text-xs self-center flex flex-col text-yellow-500">
                      <div className="flex justify-between gap-2">
                        <div>Abierta:</div> {task.live.open_date}
                      </div>
                      {task.live.close_date && (
                        <div className="flex justify-between gap-2">
                          <div>Cerrada:</div> {task.live.close_date}
                        </div>
                      )}
                      <div className="text-black">
                        instructor: {task.live.user.name}
                      </div>
                    </div>
                  )}
                  <hr />
                  <h1>{task.challenge.name}</h1>
                  {task.challenge.description}
                  <hr />
                  <div className="m-2 flex justify-center gap-2 text-gray-500">
                    <Users size="22px" />
                    {task.live?.close_date ? task.live.cant : task.cant}
                  </div>
                  {!task.live?.meet_link ? (
                    <div
                      className="btn btn-primary"
                      onClick={(e) => onOpenModal(task)}
                    >
                      Habilitar Sala
                    </div>
                  ) : !task.live?.close_date ? (
                    <div>
                      {task.live.meet_link}
                      <hr />
                      <div className="btn btn-primary my-2">
                        <a target="_blank" href={task.live?.meet_link || null}>
                          Entrar a la Sala
                        </a>
                      </div>
                      <div
                        className="btn btn-secondary"
                        onClick={() => closeTask(task)}
                      >
                        Cerrar Sala
                      </div>
                    </div>
                  ) : null}
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

      <footer className="flex h-12 w-full items-center justify-center border-t mt-6 ">
        Copyrigth {new Date().getFullYear()} - {config.app.appName}
      </footer>
    </div>
  );
};

export default Home;
