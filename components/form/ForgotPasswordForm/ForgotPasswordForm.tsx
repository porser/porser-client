import { Heart } from "@sonnat/icons";
import {
  Button,
  FormControl,
  FormControlFeedback,
  Text,
  TextField
} from "@sonnat/ui";
import makePwdManagementAPI from "apis/pwd-management.api";
import c from "classnames";
import feathersClient from "modules/feathers/client";
import Link from "next/link";
import * as React from "react";
import { validateEmailByBrowser } from "utils";
import useStyles from "./styles";

interface ForgotPasswordFormBaseProps {
  className?: string;
}

type ForgotPasswordFormProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ForgotPasswordFormBaseProps
> &
  ForgotPasswordFormBaseProps;

interface Field<T> {
  value: T;
  error: string;
  isValid: boolean;
}

type State = { email: Field<string> };

type Action =
  | { type: "RESET" }
  | { type: "SET_VALUE"; name: keyof State; value: string }
  | { type: "SET_ERROR"; name: keyof State; error: string }
  | { type: "SET_VALIDITY"; name: keyof State; validity: boolean };

type Reducer = (prevState: State, action: Action) => State;

const INITIAL_STATE: State = {
  email: { value: "", error: "", isValid: false }
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
    case "RESET":
      return INITIAL_STATE;
    default:
      return prevState;
  }
};

const checkFormValidity = (
  inputs: State
): Partial<Record<keyof State, string>> | null => {
  const isEmailValid = validateEmailByBrowser(inputs.email.value);

  if (isEmailValid) return null;

  const errors: Partial<Record<keyof State, string>> = {};

  if (!isEmailValid) errors.email = "ایمیل غیر معتبر می‌باشد.";

  return errors;
};

const pwdManagementAPI = makePwdManagementAPI(feathersClient);

const ForgotPasswordFormBase = (
  props: ForgotPasswordFormProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [globalError, setGlobalError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const [isSubmitActive, setIsSubmitActive] = React.useState(false);

  const [inputs, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const showErrors = (errors: Partial<Record<keyof State, string>> | null) => {
    dispatch({
      type: "SET_ERROR",
      name: "email",
      error: (errors && errors.email) || ""
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

    const response = await pwdManagementAPI.sendResetPasswordEmail(
      inputs.email.value
    );

    setIsSubmitting(false);

    if (response.error && response.errors) {
      if (response.errors.global) {
        setGlobalError(response.errors.global);
      } else if (response.errors.connection) {
        setGlobalError(response.errors.connection);
      } else {
        if (response.errors.email) {
          dispatch({
            type: "SET_ERROR",
            name: "email",
            error: response.errors.email
          });

          dispatch({
            type: "SET_VALIDITY",
            name: "email",
            validity: false
          });
        } else if (response.errors.skip) {
          setSuccessMessage(response.errors.skip);
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setSuccessMessage(response.data!.message);
    }
  };

  const handleTextChange = (value: string, name: string) => {
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
          <Text variant="h6" as="h1" className={classes.title}>
            ایمیل بازیابی ارسال شد!
          </Text>
          <Text variant="bodySmall" as="p" color="textSecondary">
            {successMessage}
          </Text>
          <Text
            variant="bodySmall"
            as="p"
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
            as="p"
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
        <Text variant="h6" as="h1" className={classes.title}>
          بازیابی رمز عبور
        </Text>
        <Text variant="bodySmall" as="p" color="textSecondary">
          ایمیل خود را جهت بازیابی رمز عبور وارد کنید:
        </Text>
        <FormControl
          className={classes.formControl}
          fluid
          required
          hasError={!!inputs.email.error}
        >
          <TextField
            placeholder="ایمیل"
            name="email"
            size="large"
            value={inputs.email.value}
            onChange={value => void handleTextChange(value, "email")}
          />
          {inputs.email.error && (
            <FormControlFeedback>{inputs.email.error}</FormControlFeedback>
          )}
        </FormControl>
        <Button
          className={classes.submitBtn}
          type="submit"
          color="primary"
          label="بازیابی"
          size="large"
          loading={isSubmitting}
          disabled={!isSubmitActive}
        />
        <Text
          variant="bodySmall"
          as="p"
          color="textSecondary"
          className={classes.footer}
        >
          <span>منصرف شدم:</span>
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
          as="p"
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

const ForgotPasswordForm = React.forwardRef(
  ForgotPasswordFormBase
) as typeof ForgotPasswordFormBase;

export default ForgotPasswordForm;
