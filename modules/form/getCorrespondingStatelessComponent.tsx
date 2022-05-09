import type { Field, Fields } from "./FormSerializer";
import Choice from "./widgets/choice/choice.component";
import Email from "./widgets/email/email.component";
import MultiLineText from "./widgets/multi-line-text/multi-line-text.component";
import Number from "./widgets/number/number.component";
import SingleLineText from "./widgets/single-line-text/single-line-text.component";
import URL from "./widgets/url/url.component";

const getCorrespondingStatelessComponent = (args: {
  id: string;
  className?: string;
  type: Field["type"];
  props: Field["props"];
}) => {
  const { id, className, type, props } = args;

  switch (type) {
    case "SINGLE_LINE_TEXT": {
      const { defaultValue, placeholder, maxLength, minLength } =
        props as Fields["SINGLE_LINE_TEXT"];

      return (
        <SingleLineText
          id={id}
          index={-1}
          viewId=""
          key={id}
          data-type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
          minLength={minLength}
        />
      );
    }
    case "MULTI_LINE_TEXT": {
      const { defaultValue, placeholder, maxLength, minLength } =
        props as Fields["MULTI_LINE_TEXT"];

      return (
        <MultiLineText
          id={id}
          key={id}
          index={-1}
          viewId=""
          data-type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
          maxLength={maxLength}
          minLength={minLength}
        />
      );
    }
    case "EMAIL": {
      const { defaultValue, placeholder } = props as Fields["EMAIL"];

      return (
        <Email
          id={id}
          key={id}
          index={-1}
          viewId=""
          data-type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
        />
      );
    }
    case "URL": {
      const { defaultValue, placeholder } = props as Fields["URL"];

      return (
        <URL
          id={id}
          key={id}
          index={-1}
          viewId=""
          data-type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={className}
        />
      );
    }
    case "NUMBER": {
      const { defaultValue, max, min } = props as Fields["NUMBER"];

      return (
        <Number
          id={id}
          key={id}
          index={-1}
          viewId=""
          data-type={type}
          max={max}
          min={min}
          defaultValue={defaultValue}
          className={className}
        />
      );
    }
    case "CHOICE": {
      const {
        options,
        includeOther,
        maxRequired,
        minRequired,
        multiple,
        otherDescription,
        otherLabel,
        randomized
      } = props as Fields["CHOICE"];

      return (
        <Choice
          id={id}
          key={id}
          index={-1}
          viewId=""
          data-type={type}
          className={className}
          options={options}
          includeOther={includeOther}
          maxRequired={maxRequired}
          minRequired={minRequired}
          multiple={multiple}
          otherDescription={otherDescription}
          otherLabel={otherLabel}
          randomized={randomized}
        />
      );
    }
    default:
      return null;
  }
};

export default getCorrespondingStatelessComponent;
// import { InputStepper, TextArea, TextField } from "@sonnat/ui";
// import { ChoiceField } from "./components/stateless";
// import type { Field, Fields } from "./FormSerializer";

// const getCorrespondingStatelessComponent = (args: {
//   id: string;
//   className?: string;
//   type: Field["type"];
//   props: Field["props"];
// }) => {
//   const { id, className, type, props } = args;

//   switch (type) {
//     case "SINGLE_LINE_TEXT": {
//       const { defaultValue, placeholder, maxLength, minLength } =
//         props as Fields["SINGLE_LINE_TEXT"];

//       return (
//         <TextField
//           id={id}
//           key={id}
//           data-type={type}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className={className}
//           inputProps={{ dir: "auto", maxLength, minLength }}
//         />
//       );
//     }
//     case "MULTI_LINE_TEXT": {
//       const { defaultValue, placeholder, maxLength, minLength } =
//         props as Fields["MULTI_LINE_TEXT"];

//       return (
//         <TextArea
//           id={id}
//           key={id}
//           data-type={type}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className={className}
//           inputProps={{ dir: "auto", maxLength, minLength }}
//         />
//       );
//     }
//     case "EMAIL": {
//       const { defaultValue, placeholder } = props as Fields["EMAIL"];

//       return (
//         <TextField
//           id={id}
//           key={id}
//           type="email"
//           data-type={type}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className={className}
//           inputProps={{ dir: "auto" }}
//         />
//       );
//     }
//     case "URL": {
//       const { defaultValue, placeholder } = props as Fields["URL"];

//       return (
//         <TextField
//           id={id}
//           key={id}
//           type="url"
//           data-type={type}
//           defaultValue={defaultValue}
//           placeholder={placeholder}
//           className={className}
//           inputProps={{ dir: "ltr" }}
//         />
//       );
//     }
//     case "NUMBER": {
//       const { defaultValue, max, min } = props as Fields["NUMBER"];

//       return (
//         <InputStepper
//           id={id}
//           key={id}
//           data-type={type}
//           max={max}
//           min={min}
//           defaultValue={defaultValue}
//           className={className}
//         />
//       );
//     }
//     case "CHOICE":
//       return (
//         <ChoiceField
//           choiceProps={props as Fields["CHOICE"]}
//           id={id}
//           key={id}
//           type={type}
//           className={className}
//         />
//       );
//     default:
//       return null;
//   }
// };

// export default getCorrespondingStatelessComponent;
