import {
  Dialog,
  DialogActionBar,
  DialogBody,
  DialogHeader,
  type DialogProps
} from "@sonnat/ui";
import * as React from "react";

interface ConfirmationModalBaseProps {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  title: string;
}

const ConfirmationModal = (props: ConfirmationModalBaseProps & DialogProps) => {
  const {
    title,
    children,
    actions,
    className,
    open = false,
    ...otherProps
  } = props;

  return (
    <Dialog open={open} className={className} {...otherProps}>
      <DialogHeader title={title} />
      <DialogBody>{children}</DialogBody>
      {actions && <DialogActionBar>{actions}</DialogActionBar>}
    </Dialog>
  );
};

export default ConfirmationModal;
