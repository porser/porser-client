import Text from "@sonnat/ui/Text";
import { type Field, type IContext, type View } from "./context";

export const duplicateGroup =
  (dispatch: IContext["dispatch"]) => (view: View) =>
    dispatch({ type: "DUPLICATE_VIEW", viewId: view.id });

export const deleteGroup = (dispatch: IContext["dispatch"]) => (view: View) =>
  dispatch({
    type: "SET_CONFIRMATION_MODAL",
    modal: {
      open: true,
      title: ["حذف گروه", `"${view.title}"`].join(" "),
      content: (
        <Text variant="body" color="textSecondary" as="p">
          {[
            "شما در حال حذف کردن گروه و سؤالاتش هستید.",
            "این عملیات بازگشت‌پذیر نیست، آیا از انجام این عملیات مطمئن هستید؟"
          ].join("\n")}
        </Text>
      ),
      primaryAction: {
        label: "بله، حذف شود",
        callback: () => dispatch({ type: "REMOVE_VIEW", viewId: view.id })
      }
    }
  });

export const editGroup = (dispatch: IContext["dispatch"]) => (view: View) =>
  dispatch({
    type: "SET_GROUP_SETTINGS_MODAL",
    modal: {
      open: true,
      type: "edit",
      initialState: {
        title: view.title,
        description: view.description,
        showTitle: view.showTitle,
        showDescription: view.showDescription
      },
      primaryCallback: state =>
        dispatch({ type: "PATCH_VIEW", view: { ...state, id: view.id } })
    }
  });

export const ungroup = (dispatch: IContext["dispatch"]) => (view: View) =>
  dispatch({ type: "UNGROUP", viewId: view.id });

export const group =
  (dispatch: IContext["dispatch"]) =>
  (fields: Field[], callback?: () => void) =>
    dispatch({
      type: "SET_GROUP_SETTINGS_MODAL",
      modal: {
        open: true,
        type: "create",
        initialState: undefined,
        primaryCallback: state => {
          dispatch({ type: "ADD_VIEW", view: { ...state, fields } });
          dispatch({ type: "REMOVE_FIELDS", fields });
          callback?.();
        }
      }
    });

export const editField = (dispatch: IContext["dispatch"]) => (field: Field) =>
  dispatch({
    type: "SET_FIELD_SETTINGS_MODAL",
    modal: {
      open: true,
      type: "edit",
      fieldType: field.type,
      fieldProps: field.props,
      primaryCallback: state => {
        console.log(state);
      }
    }
  });

export const addField =
  (dispatch: IContext["dispatch"]) => (fieldType: Field["type"]) =>
    dispatch({
      type: "SET_FIELD_SETTINGS_MODAL",
      modal: {
        open: true,
        type: "create",
        fieldType,
        primaryCallback: state => {
          console.log(state);
        }
      }
    });

export const duplicateField =
  (dispatch: IContext["dispatch"]) => (field: Field) =>
    dispatch({ type: "DUPLICATE_FIELD", fieldId: field.id });

export const deleteField = (dispatch: IContext["dispatch"]) => (field: Field) =>
  dispatch({
    type: "SET_CONFIRMATION_MODAL",
    modal: {
      open: true,
      title: ["حذف سؤال", `"${field.title}"`].join(" "),
      content: (
        <Text variant="body" color="textSecondary" as="p">
          {[
            "شما در حال حذف کردن سؤال هستید.",
            "این عملیات بازگشت‌پذیر نیست، آیا از انجام این عملیات مطمئن هستید؟"
          ].join("\n")}
        </Text>
      ),
      primaryAction: {
        label: "بله، حذف شود",
        callback: () => dispatch({ type: "REMOVE_FIELD", fieldId: field.id })
      }
    }
  });

export const moveFieldUp = (dispatch: IContext["dispatch"]) => (field: Field) =>
  dispatch({ type: "MOVE_FIELD_UP", fieldId: field.id });

export const moveFieldDown =
  (dispatch: IContext["dispatch"]) => (field: Field) =>
    dispatch({ type: "MOVE_FIELD_DOWN", fieldId: field.id });
