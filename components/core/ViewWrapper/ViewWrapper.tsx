import { Divider, Flex, Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import useStyles from "./styles";

export type Action = {
  reset: () => void;
  getId: () => ViewWrapperBaseProps["id"];
  getIndex: () => ViewWrapperBaseProps["index"];
  getStates: () => unknown;
};

export type FieldAction = {
  reset: () => void;
  getState: () => unknown;
};

interface ViewWrapperBaseProps {
  className?: string;
  action?: React.Ref<Action>;
  fields: React.ReactNode;
  id: string;
  index: number;
  title?: string;
  description?: string;
}

type ViewWrapperProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ViewWrapperBaseProps
> &
  ViewWrapperBaseProps;

const ViewWrapperBase = (
  props: ViewWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    id,
    index: indexProp,
    className,
    fields: fieldsProp,
    action,
    title,
    description,
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
    <Flex
      direction="column"
      mainAxisAlignment="center"
      id={id}
      ref={ref}
      data-index={`${indexProp}`}
      className={c(className, classes.root)}
      {...otherProps}
    >
      {(!!title || !!description) && (
        <React.Fragment>
          <Flex direction="column">
            {!!title && <Text variant="h6">{title}</Text>}
            {!!description && <Text variant="bodySmall">{description}</Text>}
          </Flex>
          <Divider spaced />
        </React.Fragment>
      )}
      <Flex direction="column" style={{ gap: 16 }}>
        {fields}
      </Flex>
    </Flex>
  );
};

const ViewWrapper = React.forwardRef(ViewWrapperBase) as typeof ViewWrapperBase;

export default ViewWrapper;
