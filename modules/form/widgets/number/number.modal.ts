import createPropModel from "modules/form/createModalSchema";

const models = [
  createPropModel<"NUMBER">({
    label: "آیا پاسخ به این پرسش اجباری است؟",
    name: "required",
    required: false,
    type: "boolean"
  }),
  createPropModel<"NUMBER">({
    label: "تنظیم حداقل مقدار مجاز برای ورودی",
    name: "toggle-min",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداقل مقدار مجاز",
        name: "min",
        required: true,
        type: "number"
      })
    ]
  }),
  createPropModel<"NUMBER">({
    label: "تنظیم حداکثر مقدار مجاز برای ورودی",
    name: "toggle-max",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداکثر مقدار مجاز",
        name: "max",
        required: true,
        type: "number"
      })
    ]
  })
];

export default models;
