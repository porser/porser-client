import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateByBrowser";

interface NumberBaseProps {
  className?: string;
  defaultValue?: string;
  required?: boolean;
  min?: number;
  max?: number;
  title: string;
  description?: string;
  id: string;
  index: number;
}

type NumberProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof NumberBaseProps
> &
  NumberBaseProps;

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

const NumberBase = (props: NumberProps, ref: React.Ref<HTMLDivElement>) => {
  const { id, index, defaultValue, title, description, required, min, max } =
    props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || "",
    error: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value !== state.value) {
      const error = validateInputByBrowser(value, {
        required,
        min,
        max,
        type: "number"
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
    input: `textfield-${id}-${index}`,
    descriptor: `descriptor-${id}-${index}`
  };

  return (
    <FormControl hasError={!!state.error} required={props.required} ref={ref}>
      <FormControlLabel htmlFor={ids.input}>{title}</FormControlLabel>
      <FormControlDescription id={ids.descriptor}>
        {description}
      </FormControlDescription>
      <TextField
        onChange={handleChange}
        value={state.value}
        type="text"
        inputProps={{ id: ids.input, "aria-describedby": ids.descriptor }}
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const Number = React.forwardRef(NumberBase) as typeof NumberBase;

export default Number;
