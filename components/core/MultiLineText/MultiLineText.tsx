import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextArea
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateByBrowser";

interface MultiLineTextBaseProps {
  className?: string;
  defaultValue?: string;
  required?: boolean;
}

type MultiLineTextProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof MultiLineTextBaseProps
> &
  MultiLineTextBaseProps;

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

const MultiLineTextBase = (
  props: MultiLineTextProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { defaultValue, ...otherProps } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <TextArea onChange={handleChange} value={state.value} autoResize />
      {state.error && <FormControlFeedback>{state.error}</FormControlFeedback>}
    </FormControl>
  );
};

const MultiLineText = React.forwardRef(
  MultiLineTextBase
) as typeof MultiLineTextBase;

export default MultiLineText;
