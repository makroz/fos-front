import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const DbForm = ({
  fields,
  formState,
  errors = {},
  handleChangeInput,
  action,
}: any) => {
  let subState2 = {};
  Object.keys(fields).map((key) => {
    if (fields[key].actions.includes(action)) {
      if (fields[key].options && fields[key].optionsSub) {
        if (fields[key].inputType == "subSelect") {
          fields[key].options.map((op: any, index) => {
            let value = "";
            fields[key].optionsSub.map((sub: any) => {
              if (formState[key] != "") {
                (formState[key] + "|").split("|").map((v: any) => {
                  value = "";
                  let ind: any = [];
                  if (v != "") {
                    ind = (v + ":").split(":");
                    if (ind[0] == op[fields[key].optionValue || "value"]) {
                      if (ind[1].indexOf(sub.value) > -1) {
                        value = sub.value;
                      }
                    }
                  }
                });
                subState2 = {
                  ...subState2,
                  [op[fields[key].optionValue] + "-" + sub.value]: value,
                };
              }
            });
          });
        }
      }
    }
  });

  const [subState, setSubState] = useState(subState2);

  return (
    <div>
      {Object.keys(fields).map((key) => {
        if (!fields[key].actions.includes(action)) {
          return null;
        }
        const readOnly =
          action === "view" ||
          (Array.isArray(fields[key].readOnly)
            ? fields[key].readOnly.includes(action)
            : fields[key].readOnly);

        if (fields[key].inputType == "subSelect") {
          if (!fields[key].options || !fields[key].optionsSub) return null;
          return (
            <fieldset className="border border-solid rounded-lg border-gray-700 p-3">
              <legend className="px-2">{fields[key].label}</legend>
              {formState[key]}

              <div key={key} className="flex flex-col ">
                {fields[key].options.map((op: any, index) => {
                  //let value = "";
                  return (
                    <div
                      key={key + "-" + index}
                      className="flex justify-between "
                    >
                      <div className="flex-grow">
                        {fields[key].optionsLabel || op.name}
                      </div>
                      {fields[key].optionsSub.map((sub: any) => {
                        // if (formState[key] != "") {
                        //   (formState[key] + "|").split("|").map((v: any) => {
                        //     value = "";
                        //     let ind: any = [];
                        //     if (v != "") {
                        //       ind = (v + ":").split(":");
                        //       if (
                        //         ind[0] == op[fields[key].optionValue || "value"]
                        //       ) {
                        //         if (ind[1].indexOf(sub.value) > -1) {
                        //           value = sub.value;
                        //         }
                        //       }
                        //     }
                        //   });
                        //   setSubState({
                        //     ...subState,
                        //     [op[fields[key].optionValue] +
                        //     "-" +
                        //     sub.value]: value,
                        //   });
                        // }
                        return (
                          <div key={key + "--" + sub.value} className="px-2">
                            (
                            {
                              subState[
                                op[fields[key].optionValue] + "-" + sub.value
                              ]
                            }
                            :{sub.value})
                            <input
                              type="checkbox"
                              id={op[fields[key].optionValue] + "-" + sub.value}
                              name={
                                op[fields[key].optionValue] + "-" + sub.value
                              }
                              readOnly={readOnly}
                              value={sub.value}
                              checked={
                                subState[
                                  op[fields[key].optionValue] + "-" + sub.value
                                ] == sub.value
                              }
                              onChange={(e: any) => {
                                const name = e.target.name;
                                const value = e.target.value;
                                let val = formState[key];
                                if (val == "") {
                                  if (e.target.checked) {
                                    val =
                                      "|" +
                                      op[fields[key].optionValue] +
                                      ":" +
                                      value;
                                  }
                                } else {
                                  if (
                                    val.indexOf(op[fields[key].optionValue]) >
                                    -1
                                  ) {
                                    let ind = (val + "|").split("|");
                                    ind.map((v: any, i: any) => {
                                      if (v != "") {
                                        if (
                                          v.indexOf(
                                            op[fields[key].optionValue]
                                          ) > -1
                                        ) {
                                          let vv = (v + ":").split(":");
                                          vv[1] = vv[1].replace(sub.value, "");
                                          if (e.target.checked) {
                                            vv[1] = vv[1] + sub.value;
                                          }
                                          ind[i] = "";
                                          if (vv[1] != "") {
                                            ind[i] = vv[0] + ":" + vv[1];
                                          }
                                        } else {
                                        }
                                      }
                                    });
                                    val = ind.join("|");
                                  } else {
                                    val =
                                      val +
                                      "|" +
                                      op[fields[key].optionValue] +
                                      ":" +
                                      sub.value;
                                  }
                                }
                                val = val.replace("||", "|");
                                if (
                                  val.length > 0 &&
                                  val[val.length - 1] == "|"
                                )
                                  val = val.substring(0, val.length - 1);

                                if (val == "|") val = "";
                                handleChangeInput({
                                  target: { name: key, value: val },
                                });
                              }}
                            />
                            <label
                              className="ml-2"
                              htmlFor={
                                op[fields[key].optionValue] + "-" + sub.value
                              }
                            >
                              {sub.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        }
        if (fields[key].inputType == "select") {
          return (
            <div key={key}>
              <Select
                label={fields[key].label}
                name={key}
                error={errors}
                readOnly={readOnly}
                required={fields[key].required}
                value={formState[key]}
                onChange={handleChangeInput}
                onBlur={fields[key].onBlur}
                options={fields[key].options}
                optionValue={fields[key].optionValue}
                optionLabel={fields[key].optionLabel}
              ></Select>
            </div>
          );
        }
        return (
          <div key={key}>
            <Input
              label={fields[key].label}
              type={fields[key].inputType}
              name={key}
              error={errors}
              readOnly={readOnly}
              required={fields[key].required}
              value={formState[key]}
              onChange={handleChangeInput}
              onBlur={fields[key].onBlur}
            ></Input>
          </div>
        );
      })}
    </div>
  );
};

export default DbForm;
