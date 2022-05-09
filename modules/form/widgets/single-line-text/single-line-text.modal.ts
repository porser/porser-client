import createPropModel from "modules/form/createModalSchema";

const models = [
  createPropModel<"SINGLE_LINE_TEXT">({
    label: "متن نگه‌دارنده",
    name: "placeholder",
    required: false,
    type: "string",
    description: "در صورت خالی بودن پاسخ، این متن به کاربر نشان داده خواهد شد."
  }),
  createPropModel<"SINGLE_LINE_TEXT">({
    label: "آیا پاسخ به این پرسش اجباری است؟",
    name: "required",
    required: false,
    type: "boolean"
  }),
  createPropModel<"SINGLE_LINE_TEXT">({
    label: "آیا پاسخ باید از الگوی خاصی پیروی کند؟",
    name: "toggle-pattern",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "الگوی صحیح پاسخ",
        name: "pattern",
        required: true,
        type: "string"
      })
    ]
  }),
  createPropModel<"SINGLE_LINE_TEXT">({
    label: "تنظیم حداقل طول پاسخ",
    name: "toggle-minLength",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداقل طول پاسخ",
        name: "minLength",
        required: true,
        type: "number"
      })
    ]
  }),
  createPropModel<"SINGLE_LINE_TEXT">({
    label: "تنظیم حداکثر طول پاسخ",
    name: "maxLength",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداکثر طول پاسخ",
        name: "maxLength",
        required: true,
        type: "number"
      })
    ]
  })
];

export default models;
