import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

interface LoginFormBaseProps {
  className?: string;
}

type LoginFormProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof LoginFormBaseProps
> &
  LoginFormBaseProps;

const LoginFormBase = (
  props: LoginFormProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}></div>
  );
};

const LoginForm = React.forwardRef(LoginFormBase) as typeof LoginFormBase;

export default LoginForm;
