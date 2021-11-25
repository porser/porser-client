import type { Serialize } from "./Form";
import {
  Choice,
  MultiLineText,
  Form,
  SingleLineText,
  View
} from "components/core";

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
              options={Array(5)
                .fill(null)
                .map((_, index) => ({
                  index,
                  id: `${index}`,
                  label: `${index}`,
                  value: `${index}`,
                  description: "یه متن که مثلاً توضیح می‌ده!"
                }))}
              {...field.props}
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
