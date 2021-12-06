import * as React from "react";

type FieldState = { value: unknown; isValid: boolean; otherValue?: string };
type ViewState = Record<string, FieldState>;

const noopFunction = () => void 0;

export interface IFormContext {
  views: Record<string, ViewState>;
  setFieldValidity: (
    viewId: string,
    data: { fieldId: string; isValid: boolean }
  ) => void;
  setFieldValue: (
    viewId: string,
    data: Omit<FieldState, "isValid"> & { fieldId: string }
  ) => void;
  initializeField: (
    viewId: string,
    data: FieldState & { fieldId: string }
  ) => void;
}

const FormContext = React.createContext<IFormContext>({
  views: {},
  setFieldValidity: noopFunction,
  setFieldValue: noopFunction,
  initializeField: noopFunction
});

if (process.env.NODE_ENV === "development")
  FormContext.displayName = "FormContext";

export default FormContext;
