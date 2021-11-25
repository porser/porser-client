import type {
  ConditionFieldProps,
  EmailFieldProps,
  FieldParams,
  FieldTypes,
  MultiLineTextFieldProps,
  NumberFieldProps,
  SelectFieldProps,
  SingleLineTextFieldProps,
  URLFieldProps
} from "types";
import View from "./View";

export default abstract class Field {
  protected id: string;

  protected index: number;
  protected title: string;
  protected description?: string;
  protected type: keyof FieldTypes;

  protected props: unknown;

  protected view: View;

  static Types: FieldTypes = {
    SINGLE_LINE_TEXT: "SINGLE_LINE_TEXT",
    MULTI_LINE_TEXT: "MULTI_LINE_TEXT",
    EMAIL: "EMAIL",
    URL: "URL",
    NUMBER: "NUMBER",
    CONDITION: "CONDITION",
    SELECT: "SELECT"
  };

  constructor(view: View, params: FieldParams) {
    const { title, type, description } = params;

    this.id = "";
    this.index = -1;

    this.title = title;
    this.type = type;
    this.description = description;

    this.props = {};

    this.view = view;
  }

  public abstract setProps(props: unknown): void;

  public setIndex(index: number) {
    this.index = index;
  }

  public getIndex() {
    return this.index;
  }

  public getTitle() {
    return this.title;
  }

  public getDescription() {
    return this.description;
  }

  public getType() {
    return this.type;
  }

  public getProps() {
    return this.props;
  }

  public getId() {
    return this.id;
  }

  public getView() {
    return this.view;
  }

  public getForm() {
    return this.view.getForm();
  }
}

export class SingleLineTextField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<SingleLineTextFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.SINGLE_LINE_TEXT });

    this.props = props;
  }

  public setProps(props: SingleLineTextFieldProps) {
    this.props = props;
  }
}

export class MultiLineTextField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<MultiLineTextFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.MULTI_LINE_TEXT });

    this.props = props;
  }

  public setProps(props: MultiLineTextFieldProps) {
    this.props = props;
  }
}

export class EmailField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<EmailFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.EMAIL });

    this.props = props;
  }

  public setProps(props: EmailFieldProps) {
    this.props = props;
  }
}

export class URLField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<URLFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.URL });

    this.props = props;
  }

  public setProps(props: URLFieldProps) {
    this.props = props;
  }
}

export class NumberField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<NumberFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.NUMBER });

    this.props = props;
  }

  public setProps(props: NumberFieldProps) {
    this.props = props;
  }
}

export class SelectField extends Field {
  constructor(
    view: View,
    params: FieldParams & {
      props: Omit<SelectFieldProps, "allowedOperations">;
    }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.SELECT });

    this.props = props;
  }

  public setProps(props: SelectFieldProps) {
    this.props = props;
  }
}

export class ConditionField extends Field {
  constructor(
    view: View,
    params: FieldParams & { props: ConditionFieldProps }
  ) {
    const { props, ...otherParams } = params;

    super(view, { ...otherParams, type: Field.Types.CONDITION });

    this.props = props;
  }

  public setProps(props: ConditionFieldProps) {
    this.props = props;
  }
}
