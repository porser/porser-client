import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateInputByBrowser";

interface SingleLineTextBaseProps {
  className?: string;

  defaultValue?: string;
  placeholder?: string;

  pattern?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;

  title: string;
  description?: string;
  id: string;
  index: number;
}

type SingleLineTextProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SingleLineTextBaseProps
> &
  SingleLineTextBaseProps;

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

const SingleLineTextBase = (
  props: SingleLineTextProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    id,
    index,
    title,
    description = "",

    defaultValue = "",
    placeholder,

    required,
    pattern,
    minLength,
    maxLength,

    ...otherProps
  } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue,
    error: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== state.value) {
      const error = validateInputByBrowser(value, {
        pattern,
        required,
        minLength,
        maxLength
      });

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
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const SingleLineText = React.forwardRef(
  SingleLineTextBase
) as typeof SingleLineTextBase;

export default SingleLineText;
