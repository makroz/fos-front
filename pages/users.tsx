import { Avatar } from "flowbite-react";
import { useState } from "react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const usersPage = () => {
  const [formState, setFormState] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const fields = getFields([
    "id",
    "name*|_h_::Usuario",
    "email*",
    "password*",
    "role_id|Rol|_h_",
    "status|_h_",
  ]);

  // fields["rol"].readOnly = true;
  // fields["rol"].value = "user";
  fields["role_id"].render = (value, row, key, index) => {
    return row["role"]?.name;
  };
  fields["name"].render = (value, row, key, index) => {
    return (
      <Avatar
        img=""
        placeholderInitials={initialsName(row.name)}
        rounded={true}
        className="flex-shrink-0"
      >
        <div className="space-y-1 font-medium dark:text-white">
          <div>{row.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.email}
          </div>
        </div>
      </Avatar>
    );
  };
  fields["name"].className =
    "whitespace-nowrap text-gray-900 dark:text-white  flex items-start";

  return (
    <>
      <DataCrud
        title="Usuario"
        modulo="users"
        columns={fields}
        formState={formState}
        setFormState={setFormState}
        errorsForm={errorsForm}
        setErrorsForm={setErrorsForm}
      />
    </>
  );
};

export default usersPage;
usersPage.auth = true;
