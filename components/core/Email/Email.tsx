import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateByBrowser";

interface EmailBaseProps {
  className?: string;
  defaultValue?: string;
  required?: boolean;
  title: string;
  description?: string;
  id: string;
  index: number;
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
  const { id, index, defaultValue, title, description, required } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || "",
    error: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== state.value) {
      const error = validateInputByBrowser(value, { required, type: "email" });
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
    >
      <FormControlLabel htmlFor={ids.input}>{title}</FormControlLabel>
      <FormControlDescription id={ids.descriptor}>
        {description}
      </FormControlDescription>
      <TextField
        inputProps={{ id: ids.input, "aria-describedby": ids.descriptor }}
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

const Email = React.forwardRef(EmailBase) as typeof EmailBase;

export default Email;
