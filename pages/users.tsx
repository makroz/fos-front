import { Avatar, Badge } from "flowbite-react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";
import { initialsName } from "../src/utils/string";

const usersPage = () => {
  const status = {
    A: ["Activo", "success"],
    I: ["Inactivo", "danger"],
    P: ["Pendiente", "warning"],
    X: ["Bloqueado", "grey"],
  };

  const columns = {
    name: {
      header: "Usuario",
      render: (value, row, key, index) => {
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
      },
      className:
        "whitespace-nowrap text-gray-900 dark:text-white  flex items-start",
    },
    rol: {
      header: "Rol",
    },
    status: {
      header: "Status",
      render: (value, row, key, index) => (
        <Badge
          color={status[row.status][1]}
          className="rounded-full  justify-center"
        >
          {status[row.status][0]}
        </Badge>
      ),
      className: "flex-wrap items-center",
    },
  };

  const fields = getFields(
    [
      "id",
      "name*|label:Nombre",
      "email*",
      "password*",
      "rol",
      "status",
      "created_at",
    ],
    columns
  );

  fields["created_at"].actions = ["view"];
  fields["rol"].readOnly = true;
  fields["rol"].value = "adm";

  return (
    <>
      <DataCrud
        title="user"
        modulo="users"
        columns={columns}
        formList={fields}
      />
    </>
  );
};

export default usersPage;
usersPage.auth = true;
