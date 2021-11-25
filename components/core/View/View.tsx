import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import useStyles from "./styles";

export type Action = {
  reset: () => void;
  getId: () => ViewBaseProps["id"];
  getIndex: () => ViewBaseProps["index"];
  getStates: () => unknown;
};

export type FieldAction = {
  reset: () => void;
  getState: () => unknown;
};

interface ViewBaseProps {
  className?: string;
  action?: React.Ref<Action>;
  fields: React.ReactNode;
  id: string;
  index: number;
}

type ViewProps = Omit<React.ComponentPropsWithRef<"div">, keyof ViewBaseProps> &
  ViewBaseProps;

const ViewBase = (props: ViewProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    id,
    index: indexProp,
    className,
    fields: fieldsProp,
    action,
    ...otherProps
  } = props;

  const classes = useStyles();

  const fieldActionRefs = React.useRef<React.Ref<FieldAction>[]>([]);

  React.useImperativeHandle<Action, Action>(
    action,
    () => ({
      reset: () => void 0,
      getStates: () => {
        fieldActionRefs.current.forEach(x => {
          console.log(
            x,
            (x as React.RefObject<FieldAction>).current?.getState()
          );
        });
      },
      getId: () => id,
      getIndex: () => indexProp
    }),
    [id, indexProp]
  );

  let index = 0;
  const fields = React.Children.map(fieldsProp, field => {
    if (!React.isValidElement(field)) return null;
    if (isFragment(field)) return null;

    const fieldActionRef = fieldActionRefs.current[index++];

    return React.cloneElement(field, {
      ...(field as React.ReactElement).props,
      action: fieldActionRef
    });
  });

  return (
    <div
      id={id}
      ref={ref}
      data-index={`${indexProp}`}
      className={c(className, classes.root)}
      {...otherProps}
    >
      {fields}
    </div>
  );
};

const View = React.forwardRef(ViewBase) as typeof ViewBase;

export default View;
