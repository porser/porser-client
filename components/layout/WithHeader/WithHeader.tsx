import { DashboardHeader } from "components/container";
import * as React from "react";

interface WithHeaderBaseProps {
  className?: string;
  children: React.ReactNode;
}

type WithHeaderProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof WithHeaderBaseProps
> &
  WithHeaderBaseProps;

const WithHeaderBase = (
  props: WithHeaderProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  return (
    <React.Fragment>
      <DashboardHeader ref={ref} className={className} {...otherProps} />
      {children}
    </React.Fragment>
  );
};

const WithHeader = React.forwardRef(WithHeaderBase) as typeof WithHeaderBase;

export default WithHeader;
