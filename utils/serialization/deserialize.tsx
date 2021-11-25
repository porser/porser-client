import {
  Choice,
  Form,
  MultiLineText,
  SingleLineText,
  URL,
  View
} from "components/core";
import Number from "components/core/Number";
import type { ChoiceFieldProps } from "types";
import type { Serialize } from "./Form";

const deserialize = (data: Serialize) => {
  const views = data.views.map((view, vIndex) => {
    const fields = view.fields.map((field, fIndex) => {
      switch (field.type) {
        case "SINGLE_LINE_TEXT":
          return (
            <SingleLineText
              key={`${vIndex}/${field.id}/${fIndex}`}
              id={field.id}
              title={field.title}
              description={field.description}
              index={fIndex}
              {...field.props}
            />
          );
        case "URL":
          return (
            <URL
              key={`${vIndex}/${field.id}/${fIndex}`}
              id={field.id}
              title={field.title}
              description={field.description}
              index={fIndex}
              {...field.props}
            />
          );
        case "NUMBER":
          return (
            <Number
              key={`${vIndex}/${field.id}/${fIndex}`}
              id={field.id}
              title={field.title}
              description={field.description}
              index={fIndex}
              {...field.props}
            />
          );
        case "MULTI_LINE_TEXT":
          return (
            <MultiLineText
              key={`${vIndex}/${field.id}/${fIndex}`}
              id={field.id}
              title={field.title}
              description={field.description}
              index={fIndex}
              {...field.props}
            />
          );
        case "CHOICE": {
          return (
            <Choice
              key={`${vIndex}/${field.id}/${fIndex}`}
              id={field.id}
              title={field.title}
              description={field.description}
              index={fIndex}
              {...(field.props as ChoiceFieldProps)}
            />
          );
        }
        default:
          return null;
      }
    });
    return (
      <View
        key={`${view.id}/${vIndex}`}
        id={view.id}
        index={vIndex}
        fields={fields}
        title={view.title}
        description={view.description}
      />
    );
  });

  return (
    <Form
      id=""
      title=""
      onSubmit={() => {
        console.log("calling on submit");
      }}
      views={views}
    />
  );
};

export default deserialize;
