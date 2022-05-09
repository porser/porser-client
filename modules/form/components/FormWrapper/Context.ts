import * as React from "react";

type FieldState = { value: unknown; isValid: boolean; otherValue?: string };
type ViewState = Record<string, FieldState>;

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

const FormContext = React.createContext<IFormContext | null>(null);

if (process.env.NODE_ENV === "development")
  FormContext.displayName = "FormContext";

export default FormContext;
