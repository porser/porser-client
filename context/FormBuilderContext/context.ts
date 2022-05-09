import type { State as GroupSettingsModalState } from "components/layout\
/FormBuilderLayout/partials/GroupSettingsModal";
import type { State as FieldSettingsModalState } from "components/layout\
/FormBuilderLayout/partials/FieldSettingsModal";
import FormSerializer, {
  type Field as FormField,
  type Fields,
  type SerializedForm,
  type View as FormView
} from "modules/form/FormSerializer";
import * as React from "react";
import type { AnyObject } from "types";
import generateForm from "./generate";

type ConfirmationModal = {
  title: string;
  primaryAction: { label: string; callback: () => void };
  content: React.ReactNode;
  open: boolean;
};

type GroupSettingsModal = {
  open: boolean;
  type: "create" | "edit";
  primaryCallback: (state: GroupSettingsModalState) => void;
  initialState?: Partial<GroupSettingsModalState>;
};

type FieldSettingsModal = {
  open: boolean;
  type: "create" | "edit";
  primaryCallback: (state: FieldSettingsModalState) => void;
  fieldType: keyof Fields;
  fieldProps: AnyObject;
};

export type State = {
  form: SerializedForm;
  confirmationModal: ConfirmationModal;
  groupSettingsModal: GroupSettingsModal;
  fieldSettingsModal: FieldSettingsModal;
};

type Action =
  | { type: "SET_CONFIRMATION_MODAL"; modal: Partial<ConfirmationModal> }
  | { type: "SET_GROUP_SETTINGS_MODAL"; modal: Partial<GroupSettingsModal> }
  | { type: "SET_FIELD_SETTINGS_MODAL"; modal: Partial<FieldSettingsModal> }
  | { type: "SET_FORM"; newForm: SerializedForm }
  | { type: "ADD_FIELD"; field: Field }
  | { type: "MOVE_FIELD_UP"; fieldId: Field["id"] }
  | { type: "MOVE_FIELD_DOWN"; fieldId: Field["id"] }
  | { type: "DUPLICATE_FIELD"; fieldId: Field["id"] }
  | { type: "REMOVE_FIELD"; fieldId: Field["id"] }
  | { type: "REMOVE_FIELDS"; fields: Field[] }
  | {
      type: "ADD_VIEW";
      view: Pick<View, keyof GroupSettingsModalState | "fields">;
    }
  | {
      type: "PATCH_VIEW";
      view: Pick<View, keyof GroupSettingsModalState | "id">;
    }
  | { type: "DUPLICATE_VIEW"; viewId: View["id"] }
  | { type: "REMOVE_VIEW"; viewId: View["id"] }
  | { type: "GROUP_FIELDS"; fields: Field[] }
  | { type: "UNGROUP"; viewId: View["id"] };

type Reducer = (prevState: State, action: Action) => State;

const formSerializer = new FormSerializer();

generateForm(formSerializer);

export const INITIAL_STATE = Object.freeze({
  form: formSerializer.serialize(),
  confirmationModal: {
    title: "عملیات",
    content: "",
    open: false,
    primaryAction: { label: "تأیید عملیات", callback: () => void 0 }
  },
  groupSettingsModal: {
    open: false,
    primaryCallback: () => void 0,
    type: "create"
  },
  fieldSettingsModal: {
    open: false,
    primaryCallback: () => void 0,
    type: "create",
    fieldProps: {},
    fieldType: "SINGLE_LINE_TEXT"
  }
} as State);

export const reducer: Reducer = (prevState, action) => {
  switch (action.type) {
    case "SET_FORM":
      return { ...prevState, form: action.newForm };
    case "SET_CONFIRMATION_MODAL":
      return {
        ...prevState,
        confirmationModal: { ...prevState.confirmationModal, ...action.modal }
      };
    case "SET_GROUP_SETTINGS_MODAL":
      return {
        ...prevState,
        groupSettingsModal: { ...prevState.groupSettingsModal, ...action.modal }
      };
    case "SET_FIELD_SETTINGS_MODAL":
      return {
        ...prevState,
        fieldSettingsModal: { ...prevState.fieldSettingsModal, ...action.modal }
      };
    case "ADD_FIELD": {
      const newField = formSerializer.createField(action.field);
      if (!newField) return prevState;

      return { ...prevState, form: formSerializer.serialize() };
    }
    case "MOVE_FIELD_UP": {
      const result = formSerializer.getField(action.fieldId);
      if (!result.field) return prevState;

      const fieldView = formSerializer.getView(result.field.viewId);
      if (!fieldView) return prevState;

      if (fieldView.singly) {
        const prevView = formSerializer.getViews()[fieldView.index - 1];
        if (!prevView) return prevState;

        if (prevView.singly)
          formSerializer.updateViewIndex(fieldView.id, prevView.index);
        else {
          const deleted = formSerializer.deleteView(fieldView.id);
          if (!deleted) return prevState;

          formSerializer.createField({ ...result.field, viewId: prevView.id });
        }

        return { ...prevState, form: formSerializer.serialize() };
      }

      // The field is located at the first index
      if (result.field.index === 0) {
        const deleted = formSerializer.deleteField(result.field.id);
        if (!deleted) return prevState;

        const newView = formSerializer.createView({ singly: true });
        formSerializer.createField({ ...result.field, viewId: newView.id });

        formSerializer.updateViewIndex(newView.id, fieldView.index);
        return { ...prevState, form: formSerializer.serialize() };
      }

      formSerializer.updateFieldIndex(result.field.id, result.field.index - 1);
      return { ...prevState, form: formSerializer.serialize() };
    }
    case "MOVE_FIELD_DOWN": {
      const result = formSerializer.getField(action.fieldId);
      if (!result.field) return prevState;

      const fieldView = formSerializer.getView(result.field.viewId);
      if (!fieldView) return prevState;

      if (fieldView.singly) {
        const nextView = formSerializer.getViews()[fieldView.index + 1];
        if (!nextView) return prevState;

        if (nextView.singly)
          formSerializer.updateViewIndex(fieldView.id, nextView.index);
        else {
          const deleted = formSerializer.deleteView(fieldView.id);
          if (!deleted) return prevState;

          const newField = formSerializer.createField({
            ...result.field,
            viewId: nextView.id
          });
          if (!newField) return prevState;

          formSerializer.updateFieldIndex(newField.id, 0);
        }

        return { ...prevState, form: formSerializer.serialize() };
      }

      // The field is located at the last index
      if (result.field.index === fieldView.fields.length - 1) {
        const deleted = formSerializer.deleteField(result.field.id);
        if (!deleted) return prevState;

        const newView = formSerializer.createView({ singly: true });
        formSerializer.createField({ ...result.field, viewId: newView.id });

        formSerializer.updateViewIndex(
          newView.id,
          fieldView.fields.length === 0 ? fieldView.index : fieldView.index + 1
        );
        return { ...prevState, form: formSerializer.serialize() };
      }

      formSerializer.updateFieldIndex(result.field.id, result.field.index + 1);
      return { ...prevState, form: formSerializer.serialize() };
    }
    case "ADD_VIEW": {
      const { fields, ...rest } = action.view;

      const targetView = formSerializer.getView(fields[0].viewId);
      if (!targetView) return prevState;

      const newView = formSerializer.createView({ ...rest });
      if (!newView) return prevState;

      fields.forEach(
        field =>
          void formSerializer.createField({ ...field, viewId: newView.id })
      );

      formSerializer.updateViewIndex(newView.id, targetView.index);
      return { ...prevState, form: formSerializer.serialize() };
    }
    case "PATCH_VIEW": {
      const { id, ...rest } = action.view;

      const newView = formSerializer.updateView(id, { ...rest });
      if (!newView) return prevState;

      return { ...prevState, form: formSerializer.serialize() };
    }
    case "DUPLICATE_FIELD": {
      const result = formSerializer.getField(action.fieldId);
      if (!result.field) return prevState;

      const field = formSerializer.createField(result.field);
      if (!field) return prevState;

      formSerializer.updateFieldIndex(field.id, result.field.index + 1);
      return { ...prevState, form: formSerializer.serialize() };
    }
    case "DUPLICATE_VIEW": {
      const sourceView = formSerializer.getView(action.viewId);
      if (!sourceView) return prevState;

      const targetView = formSerializer.createView(sourceView);
      if (!targetView) return prevState;

      formSerializer.updateViewIndex(targetView.id, sourceView.index + 1);
      sourceView.fields.forEach(
        field =>
          void formSerializer.createField({ ...field, viewId: targetView.id })
      );

      return { ...prevState, form: formSerializer.serialize() };
    }
    case "REMOVE_FIELD": {
      const deleted = formSerializer.deleteField(action.fieldId);
      if (!deleted) return prevState;

      return { ...prevState, form: formSerializer.serialize() };
    }
    case "REMOVE_FIELDS": {
      action.fields.forEach(field => void formSerializer.deleteField(field.id));
      return { ...prevState, form: formSerializer.serialize() };
    }
    case "REMOVE_VIEW": {
      const deleted = formSerializer.deleteView(action.viewId);
      if (!deleted) return prevState;

      return { ...prevState, form: formSerializer.serialize() };
    }
    case "UNGROUP": {
      const sourceView = formSerializer.getView(action.viewId);
      if (!sourceView) return prevState;

      let targetViewIdx = sourceView.index;
      formSerializer.deleteView(sourceView.id);

      sourceView?.fields.forEach(field => {
        const newView = formSerializer.createView({ singly: true });
        formSerializer.createField({ ...field, viewId: newView.id });

        const newIdx = formSerializer.updateViewIndex(
          newView.id,
          targetViewIdx
        )?.index;

        if (typeof newIdx !== "undefined") targetViewIdx = newIdx + 1;
      });

      return { ...prevState, form: formSerializer.serialize() };
    }
    default:
      return prevState;
  }
};

export type IContext = { state: State; dispatch: React.Dispatch<Action> };

const FormBuilderContext = React.createContext<IContext | undefined>(undefined);

if (process.env.NODE_ENV !== "production") {
  FormBuilderContext.displayName = "FormBuilderContext";
}

export type Field = FormField;
export type View = FormView;

export default FormBuilderContext;
