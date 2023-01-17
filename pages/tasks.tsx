import React, { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const tasksPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});

  const fields = getFields([
    "id",
    "challenge_id|Challenge|_h_::Tarea",
    "member_id|Afiliado|_h_",
    "level_id|Nivel|_h_",
    "to_date*|Fecha a Ejecutar|_h_",
    "executed_date|Fecha Realizada|_h_",
    "points*|Puntos|rules::number",
    "meet_link*|Link de la reunion|_h_",
    "status|_h_",
  ]);

  return (
    <>
      <DataCrud
        title="Tareas"
        modulo="tasks"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default tasksPage;
tasksPage.auth = true;
