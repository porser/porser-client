import FormWrapper from "./components/FormWrapper";
import ViewWrapper from "./components/ViewWrapper";
import type { Fields, SerializedForm } from "./FormSerializer";
import Choice from "./widgets/choice/choice.component";
import Email from "./widgets/email/email.component";
import MultiLineText from "./widgets/multi-line-text/multi-line-text.component";
import Number from "./widgets/number/number.component";
import SingleLineText from "./widgets/single-line-text/single-line-text.component";
import URL from "./widgets/url/url.component";

const deserialize = (serializedForm: SerializedForm): JSX.Element => {
  const { id, views } = serializedForm;

  const _views = views.map(view => {
    const _fields = view.fields.map(field => {
      const key = `${view.index}/${field.id}/${field.index}`;

      const baseProps = {
        key,
        viewId: view.id,
        id: field.id,
        index: field.index,
        title: field.title,
        description: field.description
      };

      switch (field.type) {
        case "SINGLE_LINE_TEXT":
          return <SingleLineText {...baseProps} {...field.props} />;
        case "MULTI_LINE_TEXT":
          return <MultiLineText {...baseProps} {...field.props} />;
        case "EMAIL":
          return <Email {...baseProps} {...field.props} />;
        case "URL":
          return <URL {...baseProps} {...field.props} />;
        case "NUMBER":
          return <Number {...baseProps} {...field.props} />;
        case "CHOICE":
          return (
            <Choice {...baseProps} {...(field.props as Fields["CHOICE"])} />
          );
        default:
          return;
      }
    });

    return (
      <ViewWrapper
        key={`${view.id}/${view.index}`}
        id={view.id}
        index={view.index}
        title={view.title}
        isFinalView={view.isFinalView}
        isInitialView={view.isInitialView}
        description={view.description}
        fields={_fields}
      />
    );
  });

  return <FormWrapper id={id} views={_views} />;
};

export default deserialize;
