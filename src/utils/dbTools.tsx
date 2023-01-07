import { capitalize } from "./string";

export const getDefaultFormState = (fields: any = {}) => {
  let result = {};
  Object.keys(fields).map((key) => {
    result[key] = fields[key].value || "";
  });
  return result;
};

export const getFields = (campos: any = [], columns: any = null) => {
  let result = {};
  let formSchema = {};

  campos.map((key) => {
    let auxN: number = -1;
    let auxS: string = "";
    let auxA: any = [];

    const field: any = {
      inputType: "text",
      required: false,
      readOnly: false,
      actions: ["add", "edit", "view"],
      className: "",
      rules: "",
      options: [],
    };
    auxN = key.indexOf("*");
    if (auxN >= 0) {
      field.required = true;
      key = key.replace("*", "");
    }

    auxN = key.indexOf("|");
    if (auxN >= 0) {
      auxA = key.split("|");
      key = auxA[0];
      auxA[0] = "";
      auxA.map((item) => {
        if (item != "" && item.indexOf(":") > 0) {
          let auxA2: any = item.split(":");
          field[auxA2[0]] = auxA2[1];
        }
      });
    }

    if (key == "id") {
      field.inputType = "hidden";
    }
    if (key == "password") {
      field.inputType = "password";
      field.rules = "min:6|max:20";
      field.actions = ["add"];
    }
    if (key == "email") {
      field.inputType = "email";
    }
    if (key == "rol") {
      field.inputType = "select";
      field.options = [
        { value: "adm", label: "Administrador" },
        { value: "usr", label: "Usuario" },
      ];
    }
    if (key == "status") {
      field.inputType = "select";
      field.options = [
        { value: "A", label: "Activo" },
        { value: "X", label: "Inactivo" },
      ];
      field.value = "A";
    }
    if (key == "email") {
      field.rules = "email";
    }
    auxN = key.indexOf("_id");
    if (auxN >= 0) {
      if (!field.label) field.label = field.label.substring(0, auxN);
      field.inputType = "select";
    }

    field.id = key;
    if (columns && columns[key]) {
      if (columns[key].header) {
        if (!field.label) field.label = columns[key].header;
      } else {
        field.label = capitalize(key);
        columns[key].header = field.label;
      }
    }
    if (!field.label) field.label = capitalize(key);
    result[key] = field;
    formSchema[key] = "";
  });
  return result;
};
