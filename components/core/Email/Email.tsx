import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateInputByBrowser";
import useFormContext from "../FormWrapper/useContext";

interface EmailBaseProps {
  className?: string;

  defaultValue?: string;
  placeholder?: string;

  required?: boolean;

  title: string;
  description?: string;
  id: string;
  index: number;
  viewId: string;
}

type EmailProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof EmailBaseProps
> &
  EmailBaseProps;

interface FieldState {
  value: string;
  error: string;
}
type Action =
  | { type: "SET_VALUE"; value: string }
  | { type: "SET_ERROR"; error: string };
type Reducer = (prevState: FieldState, action: Action) => FieldState;

const reducer: Reducer = (prevState, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      const { value } = action;
      return { ...prevState, value };
    }
    case "SET_ERROR": {
      const { error } = action;
      return { ...prevState, error };
    }
    default:
      return prevState;
  }
};

const EmailBase = (props: EmailProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    id,
    index,
    title,
    viewId,
    description = "",

    defaultValue = "",
    placeholder,

    required,

    ...otherProps
  } = props;

  const { setFieldValidity, setFieldValue, initializeField, views } =
    useFormContext();

  const viewState = views[viewId];

  const [state, dispatch] = React.useReducer(reducer, {
    value: (viewState?.[id].value as string) || defaultValue,
    error: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== state.value) {
      const error = validateInputByBrowser(value, { required, type: "email" });

      setFieldValidity(viewId, { fieldId: id, isValid: !error });
      setFieldValue(viewId, { fieldId: id, value });

      dispatch({
        type: "SET_VALUE",
        value
      });
      dispatch({
        type: "SET_ERROR",
        error
      });
    }
  };

  React.useEffect(() => {
    const error = validateInputByBrowser(state.value, {
      required,
      type: "email"
    });

    initializeField(viewId, {
      isValid: !error,
      value: state.value,
      fieldId: id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ids = {
    input: `field-${id}-${index}`,
    descriptor: `descriptor-${id}-${index}`
  };

  return (
    <FormControl
      fluid
      hasError={!!state.error}
      required={props.required}
      ref={ref}
      data-id={id}
      data-index={index}
      {...otherProps}
    >
      <FormControlLabel htmlFor={ids.input}>{title}</FormControlLabel>
      {!!description.length && (
        <FormControlDescription id={ids.descriptor}>
          {description}
        </FormControlDescription>
      )}
      <TextField
        inputProps={{
          id: ids.input,
          "aria-describedby": description.length ? ids.descriptor : undefined
        }}
        placeholder={placeholder}
        onChange={handleChange}
        value={state.value}
        type="email"
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const Email = React.memo(React.forwardRef(EmailBase)) as typeof EmailBase;

export default Email;
