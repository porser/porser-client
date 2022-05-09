import createPropModel from "modules/form/createModalSchema";

const models = [
  createPropModel<"EMAIL">({
    label: "متن نگه‌دارنده",
    name: "placeholder",
    required: false,
    type: "string",
    description: "در صورت خالی بودن پاسخ، این متن به کاربر نشان داده خواهد شد."
  }),
  createPropModel<"EMAIL">({
    label: "آیا پاسخ به این پرسش اجباری است؟",
    name: "required",
    required: false,
    type: "boolean"
  })
];

export default models;
