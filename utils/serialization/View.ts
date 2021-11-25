import Field from "./Field";
import Form from "./Form";
import deepMerge from "deepmerge";

export default class View {
  private id: string;
  private index = -1;

  private form: Form;

  private fields: Field[] = [];

  constructor(form: Form) {
    this.id = "";
    this.form = form;
  }

  public setIndex(index: number) {
    this.index = index;
  }

  public getIndex() {
    return this.index;
  }

  public getId() {
    return this.id;
  }

  public getForm() {
    return this.form;
  }

  public getFields() {
    return this.fields;
  }

  public getField(fieldId: string) {
    return this.fields.filter(field => field.getId() === fieldId)[0];
  }

  public addField(field: Field) {
    field.setIndex(this.fields.length);
    this.fields.push(field);
  }

  public removeField(field: Field) {
    const index = field.getIndex();

    this.fields = [
      ...this.fields.slice(0, index),
      ...this.fields.slice(index + 1)
    ];

    for (let i = index + 1; i < this.fields.length; i++)
      this.fields[i].setIndex(i - 1);
  }

  public updateFieldIndex(field: Field, newIndex: number) {
    const fromIndex = field.getIndex();

    const moveItem = (from: number, to: number) => {
      if (from > to) {
        this.fields = [
          ...this.fields.slice(0, to),
          this.fields[from],
          ...this.fields.slice(to + 1, from),
          this.fields[to],
          ...this.fields.slice(from + 1)
        ];
      } else moveItem(to, from);
    };

    moveItem(fromIndex, newIndex);

    field.setIndex(newIndex);
    this.fields[newIndex].setIndex(fromIndex);
  }

  public updateField<F extends Field, Props = unknown>(
    field: F,
    updatedProps: Omit<Props, "index" | "allowedOperations">,
    shallow = true
  ) {
    const props = field.getProps();

    let newProps;

    if (shallow) {
      newProps = { ...(<Record<string, unknown>>props), ...updatedProps };
    } else {
      newProps = deepMerge(<Partial<unknown>>props, updatedProps);
    }

    field.setProps(newProps);
  }
}
