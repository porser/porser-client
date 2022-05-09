import { Container } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

interface RowSlotBaseProps {
  className?: string;
}

export type RowSlotProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof RowSlotBaseProps
> &
  RowSlotBaseProps;

const RowSlot = (props: RowSlotProps) => {
  const { className, children, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div className={c(className, classes.root)} {...otherProps}>
      <Container className={classes.container}>{children}</Container>
    </div>
  );
};

export default RowSlot;
