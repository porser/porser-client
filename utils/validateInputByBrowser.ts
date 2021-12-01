export type ValidityOptions = {
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  minRequired?: number;
  maxRequired?: number;
  maxLength?: number;
  required?: boolean;
  type?: string;
};

type IsUndefined<T> = T extends undefined ? T : never;

const isUndefined = <T>(input: T): input is IsUndefined<T> =>
  typeof input === "undefined";

const numberToLocaleString = (input?: number) =>
  input ? input.toLocaleString("fa-ir", { useGrouping: false }) : "";

const validateInputByBrowser = (
  value: string | number,
  options: ValidityOptions
): string => {
  const {
    pattern,
    min,
    max,
    minLength,
    maxLength,
    minRequired,
    maxRequired,
    required = false,
    type = "text"
  } = options;

  const input = document.createElement("input");

  const messages = {
    patternMismatch: "عبارت وارد‌شده نامعتبر است",
    typeMismatch: "عبارت وارد‌شده نامعتبر است",
    rangeOverflow: `حداکثر ${numberToLocaleString(max)}`,
    rangeUnderflow: `حداقل ${numberToLocaleString(min)}`,
    tooLong: `حداکثر ${numberToLocaleString(maxLength)} حرف باید وارد شود`,
    tooShort: `حداقل ${numberToLocaleString(minLength)} حرف باید وارد شود`,
    lessSelected: `حداقل ${numberToLocaleString(
      minRequired
    )} گزینه باید انتخاب شود`,
    moreSelected: `حداکثر ${numberToLocaleString(
      maxRequired
    )} گزینه باید انتخاب شود`,
    valueMissing: "پرکردن این قسمت اجباری است"
  };

  input.type = type;
  input.value = <string>value;

  if (!isUndefined(min) || !isUndefined(max)) input.type = "number";

  if (!isUndefined(pattern)) input.pattern = pattern;
  if (!isUndefined(max)) input.max = String(max);
  if (!isUndefined(min)) input.min = String(min);
  if (!isUndefined(required)) input.required = required;

  if (
    !isUndefined(minRequired) &&
    String(value).split(",").length < minRequired
  )
    return messages.lessSelected;
  if (
    !isUndefined(maxRequired) &&
    String(value).split(",").length > maxRequired
  )
    return messages.moreSelected;

  if (!isUndefined(minLength) && String(value).length < minLength)
    return messages.tooShort;
  if (!isUndefined(maxLength) && String(value).length > maxLength)
    return messages.tooLong;

  if (input.type === "number" && input.value === "" && !!value)
    return messages.typeMismatch;

  const currentErrorKey = Object.keys(messages).find(
    key => input.validity[<keyof ValidityState>key]
  );

  if (!currentErrorKey) return "";

  return messages[<keyof typeof messages>currentErrorKey];
};

export default validateInputByBrowser;
