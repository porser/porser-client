import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

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

  const classes = useStyles();

  return (
    <div ref={ref} {...otherProps} className={c(className, classes.root)}>
      <main id="main">{children}</main>
    </div>
  );
};

const AuthLayout = React.forwardRef(AuthLayoutBase) as typeof AuthLayoutBase;

export default AuthLayout;
