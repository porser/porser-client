import { Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import useStyles from "./styles";

export interface ViewWrapperBaseProps {
  className?: string;
  fields: React.ReactNode;
  id: string;
  index: number;
  isFinalView?: boolean;
  isInitialView?: boolean;
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
    isFinalView = false,
    isInitialView = false,
    title = "",
    description = "",
    ...otherProps
  } = props;
  const classes = useStyles();

  const fields = React.Children.map(fieldsProp, field => {
    if (!React.isValidElement(field)) return null;
    if (isFragment(field)) return null;

    return React.cloneElement(field, {
      ...(field as React.ReactElement).props,
      className: classes.field
    });
  });

  const hasTitle = title.length > 0;
  const hasDescription = description.length > 0;

  return (
    <div
      id={`view-${id}`}
      ref={ref}
      data-index={`${indexProp}`}
      className={c(className, classes.root, {
        [classes.noDescription]: !hasDescription,
        [classes.finalView]: isFinalView,
        [classes.initialView]: isInitialView
      })}
      {...otherProps}
    >
      {(hasTitle || hasDescription) && (
        <div className={classes.heading}>
          {hasTitle && (
            <Text variant="h6" as="h1">
              {title}
            </Text>
          )}
          {hasDescription && (
            <Text variant="body" as="p" className={classes.description}>
              {description}
            </Text>
          )}
        </div>
      )}
      {fields}
    </div>
  );
};

const ViewWrapper = React.forwardRef(ViewWrapperBase) as typeof ViewWrapperBase;

export default ViewWrapper;
