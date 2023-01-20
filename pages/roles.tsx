import React, { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import useAxios from "../src/hooks/useAxios";
import { getFields } from "../src/utils/dbTools";

const roles = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const { data, loaded } = useAxios("/abilities", "GET", {
    perPage: -1,
    sortBy: "name",
    orderBy: "asc",
    cols: ["id", "name"],
  });

  const abilitiesL: any = [
    { label: "Crear", value: "C" },
    { label: "Leer", value: "R" },
    { label: "Editar", value: "U" },
    { label: "Borrar", value: "D" },
  ];
  const fields = getFields([
    "name*|Nombre del Permiso|_h_|rules::max:10",
    "description|Descripcion|_h_",
    "abilities*|Permisos|_h_|inputType::subSelect|optionsSub::" +
      JSON.stringify(abilitiesL) +
      "|rules::required",
    "status*|_h_",
  ]);

  fields["abilities"].optionValue = "name";
  fields["abilities"].options = data?.data;

  return (
    <>
      <DataCrud
        title="Roles"
        modulo="roles"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default roles;