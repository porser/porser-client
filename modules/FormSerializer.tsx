import {
  Choice,
  Email,
  FormWrapper,
  MultiLineText,
  Number,
  SingleLineText,
  URL,
  ViewWrapper
} from "components/core";
import { nanoid } from "nanoid";
import type { AnyObject } from "types";

interface Fields {
  SINGLE_LINE_TEXT: {
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  MULTI_LINE_TEXT: {
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  EMAIL: {
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
  };
  URL: {
    defaultValue?: string;
    placeholder?: string;
    required?: boolean;
  };
  NUMBER: {
    defaultValue?: number;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
  };
  CHOICE: {
    defaultValue?: string | string[];
    required?: boolean;
    multiple?: boolean;
    maxRequired?: number;
    minRequired?: number;
    randomized?: boolean;
    includeOther?: boolean;
    otherLabel?: string;
    otherDescription?: string;
    options: {
      value: string;
      label: string;
      description?: string;
    }[];
  };
}

interface Field {
  id: string;
  index: number;
  title: string;
  description?: string;
  type: keyof Fields;
  props: AnyObject;
  viewId: View["id"];
}

interface View {
  id: string;
  index: number;
  title: string;
  description?: string;
  fields: Field[];
}

type ReadonlyField = Readonly<Field> & {
  props: Readonly<unknown>;
};

type ReadonlyView = Readonly<View> & {
  fields: ReadonlyField[];
};

interface SerializedForm {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly views: ReadonlyView[];
}

export default class FormSerializer {
  private id: string;

  private title: string;
  private description?: string;

  private views: View[] = [];

  constructor(params: { title: string; description?: string }) {
    this.id = nanoid();

    this.title = params.title;
    this.description = params.description;
  }

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.title;
  }

  public getDescription() {
    return this.description;
  }

  public getViews() {
    return this.views;
  }

  public createView(params: { title: string; description?: string }) {
    const newView: View = {
      id: nanoid(),
      title: params.title,
      description: params.description,
      fields: [],
      index: this.views.length
    };

    this.views.push(newView);
  }

  public getView(viewId: View["id"]) {
    return this.views.find(view => view.id === viewId);
  }

  public deleteView(viewId: View["id"]) {
    this.views = this.views.filter(view => view.id !== viewId);
  }

  public updateView(
    viewId: View["id"],
    props: Partial<Omit<View, "id" | "index">>
  ) {
    const view = this.getView(viewId);

    if (!view) return;

    this.views[view.index] = { ...view, ...props };
  }

  public updateViewIndex(viewId: View["id"], newIndex: number) {
    const view = this.getView(viewId);

    if (!view) return;

    const moveItem = (from: number, to: number) => {
      const views = this.views;

      if (from > to) {
        this.views = [
          ...views.slice(0, to),
          views[from],
          ...views.slice(to + 1, from),
          views[to],
          ...views.slice(from + 1)
        ];
      } else moveItem(to, from);
    };

    this.views[view.index].index = newIndex;
    moveItem(view.index, newIndex);
  }

  public createField<T extends keyof Fields>(
    params: Omit<Field, "id" | "index"> & {
      type: T;
      props: Fields[T];
    }
  ) {
    const view = this.getView(params.viewId);

    if (!view) return;

    const newField: Field = {
      id: nanoid(),
      index: view.fields.length,
      title: params.title,
      description: params.description || "",
      viewId: params.viewId,
      props: params.props,
      type: params.type
    };

    view.fields.push(newField);
  }

  public getField(fieldId: Field["id"]) {
    for (const view of this.views) {
      const field = view.fields.find(field => field.id === fieldId);

      if (field) return { viewIndex: view.index, field };
    }

    return { viewIndex: -1, field: null };
  }

  public deleteField(fieldId: Field["id"]) {
    const { viewIndex, field } = this.getField(fieldId);

    if (!field) return;

    const view = this.views[viewIndex];

    view.fields = view.fields.filter(field => field.id !== fieldId);
  }

  public updateField<T extends keyof Fields>(
    fieldId: Field["id"],
    props: Partial<
      Omit<Field, "id" | "index"> & {
        type: T;
        props: Partial<Fields[T]>;
      }
    >
  ) {
    const { viewIndex, field } = this.getField(fieldId);

    if (!field) return;

    this.views[viewIndex].fields[field.index] = { ...field, ...props };
  }

  public updateFieldIndex(fieldId: Field["id"], newIndex: number) {
    const { viewIndex, field } = this.getField(fieldId);

    if (!field) return;

    const moveItem = (from: number, to: number) => {
      const fields = this.views[viewIndex].fields;

      if (from > to) {
        this.views[viewIndex].fields = [
          ...fields.slice(0, to),
          fields[from],
          ...fields.slice(to + 1, from),
          fields[to],
          ...fields.slice(from + 1)
        ];
      } else moveItem(to, from);
    };

    this.views[viewIndex].fields[field.index].index = newIndex;
    moveItem(field.index, newIndex);
  }

  public serialize(): SerializedForm {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      views: this.views
    };
  }

  public static deserialize(serializedForm: SerializedForm): JSX.Element {
    const { id, title, description, views } = serializedForm;

    const _views = views.map(view => {
      const _fields = view.fields.map(field => {
        const key = `${view.index}/${field.id}/${field.index}`;

        const baseProps = {
          key,
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
          description={view.description}
          fields={_fields}
        />
      );
    });

    return (
      <FormWrapper
        id={id}
        title={title}
        description={description}
        views={_views}
      />
    );
  }
}
