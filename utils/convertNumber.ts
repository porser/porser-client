const faNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const enNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const convertNumber = (number: number, to: "fa-ir" | "en-us") =>
  number
    .toString()
    .split("")
    .map(char => (to === "fa-ir" ? faNums[Number(char)] : enNums[Number(char)]))
    .join();

export default convertNumber;
