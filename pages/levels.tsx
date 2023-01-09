import DataCrud from "../src/components/DataCrud";
import { getFields } from "../src/utils/dbTools";

const levelsPage = () => {
  const fields = getFields([
    "id",
    "title*|Titulo|_h_",
    "description|Descripcion|_h_",
    "colors|Color|_h_",
    "points*|Puntos|_h_|rules::number",
    "status|_h_",
  ]);

  return (
    <>
      <DataCrud title="Nivel" modulo="levels" columns={fields} />
    </>
  );
};

export default levelsPage;
levelsPage.auth = true;
