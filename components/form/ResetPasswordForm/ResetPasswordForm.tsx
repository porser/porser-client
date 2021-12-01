import { Eye, EyeO, Heart } from "@sonnat/icons";
import {
  Button,
  FormControl,
  FormControlFeedback,
  InputAdornment,
  Text,
  TextField
} from "@sonnat/ui";
import makePwdManagementAPI from "apis/pwd-management.api";
import c from "classnames";
import feathersClient from "modules/feathers/client";
import Link from "next/link";
import * as React from "react";
import useStyles from "./styles";

interface ResetPasswordFormBaseProps {
  className?: string;
  token: string;
}

type ResetPasswordFormProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ResetPasswordFormBaseProps
> &
  ResetPasswordFormBaseProps;

interface Field<T> {
  value: T;
  error: string;
  isValid: boolean;
}

type State = {
  password: Field<string>;
};

type Action =
  | { type: "SET_VALUE"; name: keyof State; value: string }
  | { type: "SET_ERROR"; name: keyof State; error: string }
  | { type: "SET_VALIDITY"; name: keyof State; validity: boolean };

type Reducer = (prevState: State, action: Action) => State;

const INITIAL_STATE: State = {
  password: { value: "", error: "", isValid: false }
};

const reducer: Reducer = (prevState, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      const { name, value } = action;
      return { ...prevState, [name]: { ...prevState[name], value } };
    }
    case "SET_ERROR": {
      const { name, error } = action;
      return { ...prevState, [name]: { ...prevState[name], error } };
    }
    case "SET_VALIDITY": {
      const { name, validity } = action;
      return {
        ...prevState,
        [name]: { ...prevState[name], isValid: validity }
      };
    }
    default:
      return prevState;
  }
};

const checkFormValidity = (
  inputs: State
): Partial<Record<keyof State, string>> | null => {
  const isPasswordValid = inputs.password.value.length >= 10;

  if (isPasswordValid) return null;

  const errors: Partial<Record<keyof State, string>> = {};

  if (!isPasswordValid)
    errors.password = "رمز عبور غیر معتبر می‌باشد. (حداقل ۱۰ کاراکتر)";

  return errors;
};

const pwdManagementAPI = makePwdManagementAPI(feathersClient);

const ResetPasswordFormBase = (
  props: ResetPasswordFormProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { token, className, ...otherProps } = props;

  const classes = useStyles();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [globalError, setGlobalError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const [isSubmitActive, setIsSubmitActive] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [passwordInputType, setPasswordInputType] = React.useState<
    "password" | "text"
  >("password");

  const [inputs, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const showErrors = (errors: Partial<Record<keyof State, string>> | null) => {
    dispatch({
      type: "SET_ERROR",
      name: "password",
      error: (errors && errors.password) || ""
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGlobalError("");
    setSuccessMessage("");

    const errors = checkFormValidity(inputs);
    void showErrors(errors);

    if (errors) return;

    setIsSubmitting(true);

    const response = await pwdManagementAPI.resetPassword(
      inputs.password.value,
      token
    );

    setIsSubmitting(false);

    if (response.error && response.errors) {
      if (response.errors.global) {
        setGlobalError(response.errors.global);
      } else if (response.errors.connection) {
        setGlobalError(response.errors.connection);
      } else {
        if (response.errors.password) {
          dispatch({
            type: "SET_ERROR",
            name: "password",
            error: response.errors.password
          });

          dispatch({
            type: "SET_VALIDITY",
            name: "password",
            validity: false
          });
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setSuccessMessage(response.data!.message);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (value !== inputs[name as keyof State].value) {
      dispatch({
        type: "SET_VALIDITY",
        name: name as keyof State,
        validity: !!value
      });

      dispatch({
        type: "SET_VALUE",
        name: name as keyof State,
        value
      });
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordInputType(isPasswordVisible ? "password" : "text");
    setIsPasswordVisible(!isPasswordVisible);
  };

  React.useEffect(() => {
    setIsSubmitActive(
      Object.keys(inputs).every(key => inputs[key as keyof State].isValid)
    );
  }, [inputs]);

  if (successMessage)
    return (
      <div className={c(className, classes.root)} ref={ref} {...otherProps}>
        <form
          className={c(classes.form, "success")}
          onSubmit={e => void submit(e)}
        >
          <Text variant="h6" rootNode="h1" className={classes.title}>
            رمز عبور شما با موفقیت بازنشانی شد!
          </Text>
          <Text variant="bodySmall" rootNode="p" color="textSecondary">
            {successMessage}
          </Text>
          <Text
            variant="bodySmall"
            rootNode="p"
            color="textSecondary"
            className={classes.footer}
          >
            <Link href="/login">
              <a title="ورود به حساب کاربری">بازگشت به ورود</a>
            </Link>
          </Text>
        </form>
        <div className={classes.copyright}>
          <img
            className={classes.logo}
            src="/static/media/porser.svg"
            alt="Porser's Logo"
          />
          <div className={classes.copyrightDivider}></div>
          <Text
            variant="caption"
            rootNode="p"
            color="textHint"
            className={classes.copyrightText}
          >
            Powered by <Heart size={12} color="primary" />
            <br />
            Made at Hackathon
          </Text>
        </div>
      </div>
    );

  return (
    <div className={c(className, classes.root)} ref={ref} {...otherProps}>
      <form className={classes.form} onSubmit={e => void submit(e)}>
        {globalError && <div className={classes.formError}>{globalError}</div>}
        <Text variant="h6" rootNode="h1" className={classes.title}>
          بازنشانی رمز عبور
        </Text>
        <Text variant="bodySmall" rootNode="p" color="textSecondary">
          برای بازنشانی، رمز عبور جدید خود را وارد کنید:
        </Text>
        <FormControl
          className={classes.formControl}
          fluid
          required
          hasError={!!inputs.password.error}
        >
          <TextField
            placeholder="رمز عبور"
            type={passwordInputType}
            name="password"
            size="large"
            value={inputs.password.value}
            onChange={handleTextChange}
            trailingAdornment={
              <InputAdornment
                variant="icon"
                onClick={() => void handlePasswordVisibility()}
              >
                {!isPasswordVisible ? <EyeO /> : <Eye />}
              </InputAdornment>
            }
          />
          {inputs.password.error && (
            <FormControlFeedback>{inputs.password.error}</FormControlFeedback>
          )}
        </FormControl>
        <Button
          className={classes.submitBtn}
          type="submit"
          color="primary"
          label="ورود"
          size="large"
          loading={isSubmitting}
          disabled={!isSubmitActive}
        />
      </form>
      <div className={classes.copyright}>
        <img
          className={classes.logo}
          src="/static/media/porser.svg"
          alt="Porser's Logo"
        />
        <div className={classes.copyrightDivider}></div>
        <Text
          variant="caption"
          rootNode="p"
          color="textHint"
          className={classes.copyrightText}
        >
          Powered by <Heart size={12} color="primary" />
          <br />
          Made at Hackathon
        </Text>
      </div>
    </div>
  );
};

const ResetPasswordForm = React.forwardRef(
  ResetPasswordFormBase
) as typeof ResetPasswordFormBase;

export default ResetPasswordForm;
