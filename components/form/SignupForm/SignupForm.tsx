import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

interface SignupFormBaseProps {
  className?: string;
}

type SignupFormProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SignupFormBaseProps
> &
  SignupFormBaseProps;

const SignupFormBase = (
  props: SignupFormProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}></div>
  );
};

const SignupForm = React.forwardRef(SignupFormBase) as typeof SignupFormBase;

export default SignupForm;
