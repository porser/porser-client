import { nanoid } from "nanoid";
import type { AnyObject } from "types";

export interface Fields {
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
    required?: boolean;
    min?: number;
    max?: number;
  };
  CHOICE: {
    defaultValue?: string | string[];
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

export interface Field {
  id: string;
  index: number;
  title: string;
  description: string;
  type: keyof Fields;
  props: AnyObject;
  viewId: View["id"];
}

export interface View {
  id: string;
  index: number;
  title: string;
  description: string;
  isFinalView?: boolean;
  isInitialView?: boolean;
  fields: Field[];
  singly: boolean;
  showTitle: boolean;
  showDescription: boolean;
}

type ReadonlyField = Readonly<Field> & {
  props: Readonly<unknown>;
};

type ReadonlyView = Readonly<View> & {
  fields: ReadonlyField[];
};

export interface SerializedForm {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly views: ReadonlyView[];
}

export default class FormSerializer {
  private readonly id: string;

  private title: string;
  private description: string;

  private views: View[] = [];

  constructor(params?: { title?: string; description?: string }) {
    this.id = nanoid();

    this.title = params?.title || "";
    this.description = params?.description || "";
  }

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getViews() {
    return this.views;
  }

  public createView(params?: Partial<Omit<View, "id" | "index">>) {
    const newView: View = {
      id: nanoid(),
      title: params?.title ?? "",
      description: params?.description ?? "",
      isFinalView: params?.isFinalView ?? false,
      isInitialView: params?.isInitialView ?? false,
      singly: params?.singly ?? false,
      showTitle: params?.showTitle ?? true,
      showDescription: params?.showDescription ?? true,
      fields: [],
      index: this.views.length
    };

    this.views.push(newView);

    return newView;
  }

  public getView(viewId: View["id"]) {
    return this.views.find(view => view.id === viewId);
  }

  public deleteView(viewId: View["id"]) {
    const view = this.getView(viewId);

    if (!view) return false;

    this.views = this.views
      .filter(view => view.id !== viewId)
      .map((view, idx) => {
        view.index = idx;
        return view;
      });

    return true;
  }

  public updateView(
    viewId: View["id"],
    props: Partial<
      Omit<View, "id" | "index" | "isFinalView" | "isInitialView" | "singly">
    >
  ) {
    const view = this.getView(viewId);

    if (!view) return;

    this.views[view.index] = { ...view, ...props };

    return this.views[view.index];
  }

  public updateViewIndex(viewId: View["id"], newIndex: number) {
    const view = this.getView(viewId);

    if (!view) return;

    const target = this.views[view.index];

    const moveItem = (from: number, to: number) => {
      if (from === to) return;

      if (from > to) {
        this.views = [
          ...this.views.slice(0, to),
          this.views[from],
          ...this.views.slice(to, from),
          ...this.views.slice(from + 1)
        ].map((view, idx) => {
          view.index = idx;
          return view;
        });
      } else moveItem(to, from);
    };

    moveItem(view.index, newIndex);

    return target;
  }

  public createField<T extends keyof Fields>(
    params: Omit<Field, "id" | "index" | "description" | "type" | "props"> & {
      description?: string;
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
      description: params.description ?? "",
      viewId: params.viewId,
      props: params.props,
      type: params.type
    };

    view.fields.push(newField);

    return newField;
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

    if (!field) return false;

    const view = this.views[viewIndex];

    view.fields = view.fields
      .filter(field => field.id !== fieldId)
      .map((field, idx) => {
        field.index = idx;
        return field;
      });

    if (view.fields.length === 0) return this.deleteView(view.id);
    return true;
  }

  public updateField<T extends keyof Fields>(
    fieldId: Field["id"],
    props: Partial<
      Omit<Field, "id" | "index" | "type" | "props"> & {
        type: T;
        props: Partial<Fields[T]>;
      }
    >
  ) {
    const { viewIndex, field } = this.getField(fieldId);

    if (!field) return;

    this.views[viewIndex].fields[field.index] = { ...field, ...props };

    return this.views[viewIndex].fields[field.index];
  }

  public updateFieldIndex(fieldId: Field["id"], newIndex: number) {
    const { viewIndex, field } = this.getField(fieldId);

    if (!field) return;

    const view = this.views[viewIndex];
    const target = view.fields[field.index];

    const moveItem = (from: number, to: number) => {
      if (from === to) return;

      if (from > to) {
        view.fields = [
          ...view.fields.slice(0, to),
          view.fields[from],
          ...view.fields.slice(to, from),
          ...view.fields.slice(from + 1)
        ].map((field, idx) => {
          field.index = idx;
          return field;
        });
      } else moveItem(to, from);
    };

    moveItem(field.index, newIndex);

    return target;
  }

  public serialize(): SerializedForm {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      views: this.views
    };
  }
}
