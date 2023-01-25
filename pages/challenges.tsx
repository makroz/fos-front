import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const challengesPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});

  const { data } = useAxios("/levels", "GET", {
    perPage: -1,
    sortBy: "id",
    orderBy: "asc",
    cols: ["id", "title"],
  });

  const fields: any = getFields([
    "id",
    "name*|Nombre|_h_",
    "description|Descripción",
    "time_begin*|Hora de Inicio|_h_",
    "duration*|Duración (minutos)|_h_|rules::number|value::30",
    "repeat*|Repite Tarea|_h_|rules::number|value::1",
    "separations|Separación(dias)|rules::number|value::1",
    "position*|Orden|_h_|rules::number",
    "level_id*|Nivel|_h_",
    "points*|Puntos|_h_|rules::number",
    "status|_h_",
  ]);

  fields.level_id.options = data?.data;
  fields.level_id.optionLabel = "title";

  return (
    <>
      <DataCrud
        title="Challenges"
        modulo="challenges"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default challengesPage;
challengesPage.auth = true;
