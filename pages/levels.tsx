import { Badge } from "flowbite-react";
import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const levelsPage = () => {
  const status = {
    A: ["Active", "success"],
    I: ["Inactive", "danger"],
    P: ["Pending", "warning"],
    X: ["Blocked", "grey"],
  };

  const columns = {
    title: {
      header: "Titulo",
      className: "",
    },
    description: {
      header: "Descripcion",
    },
    colors: {
      header: "Color",
    },
    points: {
      header: "Puntos",
    },
    status: {
      header: "Status",
      render: (value, row, key, index) => (
        <Badge
          color={status[row.status] ? status[row.status][1] : ""}
          className="rounded-full  justify-center"
        >
          {status[row.status] ? status[row.status][0] : "Desconocido"}
        </Badge>
      ),
      className: "flex-wrap items-center",
    },
  };

  const fields = getFields([
    "id",
    "title*",
    "description",
    "colors",
    "points*|rules:number",
    "status",
  ]);

  return (
    <>
      <DataCrud
        title="Nivel"
        modulo="levels"
        columns={columns}
        formList={fields}
      />
    </>
  );
};

export default levelsPage;
levelsPage.auth = true;
