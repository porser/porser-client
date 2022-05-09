import createPropModel from "modules/form/createModalSchema";

const models = [
  createPropModel<"CHOICE">({
    label: "گزینه‌ها",
    name: "options",
    required: true,
    type: "options"
  }),
  createPropModel<"CHOICE">({
    label: "تنظیم حداقل تعداد گزینه‌های قابل انتخاب",
    name: "toggle-minRequired",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداقل تعداد گزینه انتخابی",
        required: true,
        name: "minRequired",
        type: "number"
      })
    ]
  }),
  createPropModel<"CHOICE">({
    label: "تنظیم حداکثر تعداد گزینه‌های قابل انتخاب",
    name: "toggle-maxRequired",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel({
        label: "حداکثر تعداد گزینه انتخابی",
        required: true,
        name: "maxRequired",
        type: "number"
      })
    ]
  }),
  createPropModel<"CHOICE">({
    label: "نمایش تصادفی گزینه‌ها",
    name: "randomized",
    required: false,
    type: "boolean"
  }),
  createPropModel<"CHOICE">({
    label: 'اضافه کردن گزینه "سایر"',
    name: "includeOther",
    required: false,
    type: "boolean",
    toggleChildren: [
      createPropModel<"CHOICE">({
        label: "عنوان گزینه",
        name: "otherLabel",
        required: true,
        type: "string"
      }),
      createPropModel<"CHOICE">({
        label: "توضیح گزینه",
        name: "otherDescription",
        required: true,
        type: "longstring"
      })
    ]
  })
];

export default models;
