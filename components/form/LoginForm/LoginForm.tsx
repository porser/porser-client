import { Eye, EyeO, Heart } from "@sonnat/icons";
import {
  Button,
  FormControl,
  FormControlFeedback,
  InputAdornment,
  Text,
  TextField
} from "@sonnat/ui";
import makeUserAPI from "apis/user.api";
import c from "classnames";
import feathersClient from "modules/feathers/client";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useAuthState } from "store";
import { storeRefreshToken, validateEmailByBrowser } from "utils";
import useStyles from "./styles";

interface LoginFormBaseProps {
  className?: string;
}

type LoginFormProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof LoginFormBaseProps
> &
  LoginFormBaseProps;

interface Field<T> {
  value: T;
  error: string;
  isValid: boolean;
}

type State = {
  email: Field<string>;
  password: Field<string>;
};

type Action =
  | { type: "SET_VALUE"; name: keyof State; value: string }
  | { type: "SET_ERROR"; name: keyof State; error: string }
  | { type: "SET_VALIDITY"; name: keyof State; validity: boolean };

type Reducer = (prevState: State, action: Action) => State;

const INITIAL_STATE: State = {
  email: { value: "", error: "", isValid: false },
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
  const isEmailValid = validateEmailByBrowser(inputs.email.value);
  const isPasswordValid = inputs.password.value.length >= 10;

  if (isPasswordValid && isEmailValid) return null;

  const errors: Partial<Record<keyof State, string>> = {};

  if (!isPasswordValid)
    errors.password = "رمز عبور غیر معتبر می‌باشد. (حداقل ۱۰ کاراکتر)";
  if (!isEmailValid) errors.email = "ایمیل غیر معتبر می‌باشد.";

  return errors;
};

const UserAPI = makeUserAPI(feathersClient);

const LoginFormBase = (
  props: LoginFormProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [globalError, setGlobalError] = React.useState("");

  const [isSubmitActive, setIsSubmitActive] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [passwordInputType, setPasswordInputType] = React.useState<
    "password" | "text"
  >("password");

  const setUser = useAuthState(state => state.setUser);

  const [inputs, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const showErrors = (errors: Partial<Record<keyof State, string>> | null) => {
    dispatch({
      type: "SET_ERROR",
      name: "email",
      error: (errors && errors.email) || ""
    });
    dispatch({
      type: "SET_ERROR",
      name: "password",
      error: (errors && errors.password) || ""
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGlobalError("");

    const errors = checkFormValidity(inputs);
    void showErrors(errors);

    if (errors) return;

    setIsSubmitting(true);

    const loginResponse = await UserAPI.login(
      inputs.email.value,
      inputs.password.value
    );

    setIsSubmitting(false);

    if (loginResponse.error && loginResponse.errors) {
      if (loginResponse.errors.global) {
        setGlobalError(loginResponse.errors.global);
      } else if (loginResponse.errors.auth) {
        setGlobalError(loginResponse.errors.auth);
      } else if (loginResponse.errors.connection) {
        setGlobalError(loginResponse.errors.connection);
      } else {
        if (loginResponse.errors.email) {
          dispatch({
            type: "SET_ERROR",
            name: "email",
            error: loginResponse.errors.email
          });

          dispatch({
            type: "SET_VALIDITY",
            name: "email",
            validity: false
          });
        } else if (loginResponse.errors.password) {
          dispatch({
            type: "SET_ERROR",
            name: "password",
            error: loginResponse.errors.password
          });

          dispatch({
            type: "SET_VALIDITY",
            name: "password",
            validity: false
          });
        }
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
      const { refreshToken, ...userData } = loginResponse.data!;

      setUser(userData);
      storeRefreshToken(refreshToken);

      void router.replace("/dashboard");
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

  const handlePasswordVisibility = () => {
    setPasswordInputType(isPasswordVisible ? "password" : "text");
    setIsPasswordVisible(!isPasswordVisible);
  };

  React.useEffect(() => {
    setIsSubmitActive(
      Object.keys(inputs).every(key => inputs[key as keyof State].isValid)
    );
  }, [inputs]);

  return (
    <div className={c(className, classes.root)} ref={ref} {...otherProps}>
      <form className={classes.form} onSubmit={e => void submit(e)}>
        {globalError && <div className={classes.formError}>{globalError}</div>}
        <Text variant="h6" as="h1" className={classes.title}>
          ورود
        </Text>
        <Text variant="bodySmall" as="p" color="textSecondary">
          برای ورود، ایمیل و رمز عبور خود را وارد کنید:
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
            onChange={value => void handleTextChange(value, "password")}
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
        <Text
          variant="bodySmall"
          as="p"
          color="textSecondary"
          className={classes.footer}
        >
          <Link href="/forgot-password">
            <a title="بازیابی رمز عبور">بازیابی رمز عبور</a>
          </Link>
        </Text>
        <Text
          variant="bodySmall"
          as="p"
          color="textSecondary"
          className={classes.footer}
        >
          <span>حساب کاربری ندارم:</span>
          <Link href="/signup">
            <a title="ساخت حساب کاربری">ثبت‌نام</a>
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

const LoginForm = React.forwardRef(LoginFormBase) as typeof LoginFormBase;

export default LoginForm;
