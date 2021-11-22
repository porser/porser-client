import * as React from "react";
import useStyles from "./styles";
import Spinner from "@sonnat/ui/Spinner/Clip";
import Text from "@sonnat/ui/Text";
import c from "classnames";

interface PageSuspensionBaseProps {
  className?: string;
  suspend: boolean;
}

type PageSuspensionProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof PageSuspensionBaseProps
> &
  PageSuspensionBaseProps;

const PageSuspensionBase = (
  props: PageSuspensionProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { suspend, className, children, ...otherProps } = props;

  const classes = useStyles();

  if (!suspend) return <React.Fragment>{children}</React.Fragment>;

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Spinner size={24} className={classes.spinner} />
      <Text
        className={classes.text}
        variant="subtitleSmall"
        color="textSecondary"
      >
        لطفاً صبر کنید...
      </Text>
    </div>
  );
};

const PageSuspension = React.forwardRef(
  PageSuspensionBase
) as typeof PageSuspensionBase;

export default PageSuspension;
