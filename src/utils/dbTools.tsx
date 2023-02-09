import { capitalize } from "./string";
import t from "./traductor";

export const getDefaultFormState = (fields: any = {}) => {
  let result = {};
  Object.keys(fields).map((key) => {
    result[key] = fields[key].value || "";
  });
  return result;
};

export const getFields = (campos: any = []) => {
  let result = {};
  campos.map((key) => {
    let auxN: number = -1;
    let auxS: string = "";
    let auxA: any = [];

    const field: any = {
      inputType: "text",
      required: false,
      readOnly: false,
      sortable: true,
      actions: ["add", "edit", "view"],
      search: true,
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
        if (item != "" && item.indexOf("::") > 0) {
          let auxA2: any = item.split("::");
          if (auxA2[0] == "_h_") {
            auxA2[0] = "header";
          }
          try {
            field[auxA2[0]] = JSON.parse(auxA2[1]);
          } catch (e) {
            field[auxA2[0]] = auxA2[1].replace("||", "|");
          }
        } else {
          if (item == "_h_") {
            field["header"] = true;
          } else {
            if (item != "") field["label"] = item;
          }
        }
      });
    }

    if (key == "id") {
      field.inputType = "hidden";
      field.search = false;
    }
    if (key == "password") {
      field.inputType = "password";
      field.rules = field.rules || "min:6|max:20";
      field.actions = ["add"];
      field.search = false;
    }
    if (key == "rol") {
      field.inputType = "select";
    }
    if (key == "status") {
      field.inputType = "select";
      field.options = field.options || [
        { id: "A", name: t("Active") },
        { id: "X", name: t("Inactive") },
      ];
      field.value = field.value || "A";
      field.badge = true;
    }
    if (key == "email") {
      field.inputType = "email";
      field.rules = field.rules || "email";
    }
    auxN = key.indexOf("_id");
    if (auxN >= 0) {
      field.label = field.label || key.substring(0, auxN);
      field.inputType = "select";
    }
    if (field.inputType == "select" || field.inputType == "subSelect") {
      field.optionValue = field.optionValue || "id";
      field.optionLabel = field.optionLabel || "name";
    }

    field.id = key;
    field.label = field.label || capitalize(key);
    result[key] = field;
  });

  result["_actions"] = {};
  result["_row"] = {
    className: "odd:bg-white even:bg-gray-50 hover:bg-gray-200",
  };
  result["_sel"] = false;

  return result;
};
