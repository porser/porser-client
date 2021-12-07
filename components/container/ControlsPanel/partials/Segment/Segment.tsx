import { Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

interface SegmentBaseProps {
  className?: string;
  title?: string;
  headingChildren?: React.ReactNode;
  headingAction?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

type SegmentProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SegmentBaseProps
> &
  SegmentBaseProps;

const SegmentBase = (props: SegmentProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    headingChildren,
    headingAction,
    title,
    description,
    children,
    className,
    ...otherProps
  } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div className={classes.heading}>
        {title && (
          <Text className={classes.title} variant="subtitle">
            {title}
          </Text>
        )}
        {headingChildren}
        <div className={classes.headingActionBar}>{headingAction}</div>
      </div>
      {description && (
        <Text
          className={classes.description}
          variant="bodySmall"
          color="textSecondary"
          rootNode="p"
        >
          {description}
        </Text>
      )}
      {children && <div className={classes.content}>{children}</div>}
    </div>
  );
};

const Segment = React.forwardRef(SegmentBase) as typeof SegmentBase;

export default Segment;
