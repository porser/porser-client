import c from "classnames";
import * as React from "react";

interface AuthLayoutBaseProps {
  className?: string;
  children?: React.ReactNode;
}

type AuthLayoutProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof AuthLayoutBaseProps
> &
  AuthLayoutBaseProps;

const AuthLayoutBase = (
  props: AuthLayoutProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  return (
    <div ref={ref} {...otherProps} className={c(className)}>
      <main id="main">{children}</main>
    </div>
  );
};

const AuthLayout = React.forwardRef(AuthLayoutBase) as typeof AuthLayoutBase;

export default AuthLayout;
