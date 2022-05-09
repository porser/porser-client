import type { Field } from "./FormSerializer";
import choiceModalSchema from "./widgets/choice/choice.modal";
import emailModalSchema from "./widgets/email/email.modal";
import multiLineTextModalSchema from "./widgets/multi-line-text/multi-line-text.modal";
import numberModalSchema from "./widgets/number/number.modal";
import singleLineTextModalSchema from "./widgets/single-line-text/single-line-text.modal";
import urlModalSchema from "./widgets/url/url.modal";

const getCorrespondingModalSchema = (type: Field["type"]) => {
  switch (type) {
    case "SINGLE_LINE_TEXT":
      return singleLineTextModalSchema;
    case "MULTI_LINE_TEXT":
      return multiLineTextModalSchema;
    case "EMAIL":
      return emailModalSchema;
    case "URL":
      return urlModalSchema;
    case "NUMBER":
      return numberModalSchema;
    case "CHOICE":
      return choiceModalSchema;
    default:
      return null;
  }
};

export default getCorrespondingModalSchema;
