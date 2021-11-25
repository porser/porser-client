export type ValidityOptions = {
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  type?: string;
};

type IsUndefined<T> = T extends undefined ? T : never;

const isUndefined = <T>(input: T): input is IsUndefined<T> =>
  typeof input === "undefined";

const validateByBrowser = (
  value: string | number,
  options: ValidityOptions
): string | undefined => {
  const {
    pattern,
    min,
    max,
    minLength,
    maxLength,
    required = false,
    type = "text"
  } = options;
  const input = document.createElement("input");

  input.type = type;
  input.value = <string>value;

  if (!isUndefined(min) || !isUndefined(max)) input.type = "number";

  if (!isUndefined(pattern)) input.pattern = pattern;
  if (!isUndefined(max)) input.max = String(max);
  if (!isUndefined(min)) input.min = String(min);
  if (!isUndefined(required)) input.required = required;

  const messages = {
    patternMismatch: "عبارت وارد‌شده نامعتبر است",
    rangeOverflow: `حداکثر ${Number(max).toLocaleString("fa-ir", {
      useGrouping: false
    })}`,
    rangeUnderflow: `حداقل ${Number(min).toLocaleString("fa-ir", {
      useGrouping: false
    })}`,
    tooLong: `حداکثر ${Number(maxLength).toLocaleString("fa-ir", {
      useGrouping: false
    })} حرف`,
    tooShort: `حداقل ${Number(minLength).toLocaleString("fa-ir", {
      useGrouping: false
    })} حرف`,
    valueMissing: "پرکردن این قسمت اجباری است"
  };

  if (!isUndefined(minLength) && String(value).length < minLength)
    return messages.tooShort;
  if (!isUndefined(maxLength) && String(value).length > maxLength)
    return messages.tooLong;

  const currentErrorKey = Object.keys(messages).find(
    key => input.validity[<keyof ValidityState>key]
  );

  if (!currentErrorKey) return;

  return messages[<keyof typeof messages>currentErrorKey];
};

export default validateByBrowser;
