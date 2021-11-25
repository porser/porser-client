import type { FieldParams } from "types";
import Field from "./Field";
import View from "./View";

export interface Serialize {
  views: {
    id: View["id"];
    fields: Array<FieldParams & { id: string; index: number; props: unknown }>;
  }[];
}

export default class Form {
  private id: string;

  private views: View[] = [];
  private serialized: Serialize = { views: [] };

  constructor() {
    this.id = "";
  }

  private _serializeField(field: Field) {
    const base = {
      id: field.getId(),
      title: field.getTitle(),
      index: field.getIndex(),
      type: field.getType(),
      props: field.getProps()
    };

    switch (field.getType()) {
      case "EMAIL":
      case "URL":
      case "MULTI_LINE_TEXT":
      case "SINGLE_LINE_TEXT":
      case "NUMBER":
      case "SELECT":
        return { ...base, description: field.getDescription() };
      case "CONDITION":
      default:
        return base;
    }
  }

  private _serializeFields(fields: Field[]) {
    return fields.map(field => this._serializeField(field));
  }

  private _serializeView(view: View) {
    const viewId = view.getId();

    const serializedFields = this._serializeFields(view.getFields());
    const serializedView = this.serialized.views.filter(
      view => view.id === viewId
    )[0];

    if (!serializedView) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    serializedView.fields = serializedFields;

    this.serialized.views[view.getIndex()] = serializedView;
  }

  public getId() {
    return this.id;
  }

  public getViews() {
    return this.views;
  }

  public getView(viewId: View["id"]) {
    return this.views.filter(view => view.getId() === viewId)[0];
  }

  public getSerializedVersion() {
    return this.serialized;
  }

  public createView(view: View) {
    view.setIndex(this.views.length);

    this.views.push(view);
    this.serialized.views.push({ id: view.getId(), fields: [] });

    this._serializeView(view);
  }

  public deleteView(view: View) {
    this.views = this.views.filter(v => v.getId() !== view.getId());
    this.serialized.views = this.serialized.views.filter(
      v => v.id !== view.getId()
    );

    this._serializeView(view);
  }

  public createField(field: Field) {
    const view = field.getView();

    view.addField(field);

    this._serializeView(view);
  }

  public deleteField(field: Field) {
    const view = field.getView();

    view.removeField(field);

    this._serializeView(view);
  }

  public updateFieldIndex(field: Field, newIndex: number) {
    const view = field.getView();

    view.updateFieldIndex(field, newIndex);

    this._serializeView(view);
  }

  public updateField<F extends Field, Props = unknown>(
    field: F,
    updatedProps: Omit<Props, "index" | "allowedOperations">,
    shallow = true
  ) {
    const view = field.getView();

    view.updateField<F, Props>(field, updatedProps, shallow);

    this._serializeView(view);
  }
}
