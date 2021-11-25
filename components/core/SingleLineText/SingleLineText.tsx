import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateByBrowser";

interface SingleLineTextBaseProps {
  className?: string;
  defaultValue?: string;
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  type?: string;
}

type SingleLineTextProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SingleLineTextBaseProps
> &
  SingleLineTextBaseProps;

interface FieldState {
  value: string;
  error?: string | null;
}
type Action =
  | { type: "SET_VALUE"; value: string }
  | { type: "SET_ERROR"; error?: string | null };
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
  const { defaultValue, ...otherProps } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== state.value) {
      const error = validateInputByBrowser(value, otherProps);
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

  return (
    <FormControl hasError={!!state.error} required={props.required} ref={ref}>
      <FormControlLabel>Label</FormControlLabel>
      <FormControlDescription>Description</FormControlDescription>
      <TextField onChange={handleChange} value={state.value} />
      {state.error && <FormControlFeedback>{state.error}</FormControlFeedback>}
    </FormControl>
  );
};

const SingleLineText = React.forwardRef(
  SingleLineTextBase
) as typeof SingleLineTextBase;

export default SingleLineText;