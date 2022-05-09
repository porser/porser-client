import { type DialogProps } from "@sonnat/ui";
import type { Fields } from "modules/form/FormSerializer";
import GeneratePropsDialog, {
  type State as DialogState
} from "modules/form/GeneratePropsDialog";
import getCorrespondingModalSchema from "modules/form/getCorresponsingModalSchema";
import * as React from "react";
import type { AnyObject } from "types";

export type State = DialogState;

interface FieldSettingsModalBaseProps {
  className?: string;
  type: "create" | "edit";
  fieldType: keyof Fields;
  fieldProps: AnyObject;
  primaryCallback: (state: State) => void;
}

type FieldSettingsModalProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldSettingsModalBaseProps
> &
  FieldSettingsModalBaseProps;

const FieldSettingsModal = (props: FieldSettingsModalProps & DialogProps) => {
  const {
    className,
    open,
    onClose,
    fieldType,
    fieldProps,
    primaryCallback,
    type = "create",
    ...otherProps
  } = props;

  const modalTitle = type === "create" ? "ایجاد سؤال" : "ویرایش سؤال";
  const primaryActionLabel = type === "create" ? "ایجاد کردن" : "ویرایش کردن";

  return (
    <GeneratePropsDialog
      title={modalTitle}
      open={open}
      className={className}
      initialState={type === "create" ? null : fieldProps}
      modalSchema={getCorrespondingModalSchema(fieldType)}
      onCancel={() => void onClose?.()}
      onBackdropClick={() => void onClose?.()}
      onEscapeKeyUp={() => void onClose?.()}
      primaryAction={{
        callback: state => void (primaryCallback(state), onClose?.()),
        label: primaryActionLabel
      }}
      {...otherProps}
    />
  );
};

export default FieldSettingsModal;
