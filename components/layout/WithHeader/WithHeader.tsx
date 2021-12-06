import { DashboardHeader } from "components/container";
import { BYPASS_ROUTES } from "constants.app";
import { useRouter } from "next/router";
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

  const router = useRouter();

  return (
    <React.Fragment>
      <DashboardHeader
        ref={ref}
        className={className}
        asPublicHeader={BYPASS_ROUTES.includes(router.pathname)}
        {...otherProps}
      />
      {children}
    </React.Fragment>
  );
};

const WithHeader = React.forwardRef(WithHeaderBase) as typeof WithHeaderBase;

export default WithHeader;
