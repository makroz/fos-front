import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const tasksPage = () => {
  const params = {
    relations: "challenge,member,level",
  };

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
    "meet_link*|Link de la reunion",
    "status|_h_",
  ]);

  fields["level_id"].render = (value, row, key, index) => row.level.title;
  fields["challenge_id"].render = (value, row, key, index) =>
    row.challenge.name;
  fields["member_id"].render = (value, row, key, index) => row.member.name;
  fields["_actions"].render = (value, row, index) => {
    if (value == "del" || value == "add") return false;
    return true;
  };

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
        param={params}
      />
    </>
  );
};

export default tasksPage;
tasksPage.auth = true;
