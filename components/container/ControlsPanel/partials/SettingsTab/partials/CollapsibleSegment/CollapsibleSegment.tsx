import { ChevronDown, ChevronLeft } from "@sonnat/icons";
import { Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { UnmountClosed as Collapse } from "react-collapse";
import useStyles from "./styles";

interface CollapsibleSegmentBaseProps {
  className?: string;
  children?: React.ReactNode;
  triggerTitle: string;
  isOpen: boolean;
  onTrigger: () => void;
}

type CollapsibleSegmentProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof CollapsibleSegmentBaseProps
> &
  CollapsibleSegmentBaseProps;

const CollapsibleSegmentBase = (
  props: CollapsibleSegmentProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    onTrigger,
    triggerTitle,
    className,
    children,
    isOpen = false,
    ...otherProps
  } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div
        role="button"
        onClick={() => void onTrigger()}
        className={classes.trigger}
      >
        {isOpen ? (
          <ChevronDown size={20} color="textSecondary" />
        ) : (
          <ChevronLeft size={20} color="textSecondary" />
        )}
        <Text className={classes.title} variant="subtitle">
          {triggerTitle}
        </Text>
      </div>
      <Collapse theme={{ collapse: classes.collapse }} isOpened={isOpen}>
        <div className={classes.content}>{children}</div>
      </Collapse>
    </div>
  );
};

const CollapsibleSegment = React.forwardRef(
  CollapsibleSegmentBase
) as typeof CollapsibleSegmentBase;

export default CollapsibleSegment;
