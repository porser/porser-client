import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  InputStepper
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateInputByBrowser";

interface NumberBaseProps {
  className?: string;

  defaultValue?: number;

  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean;

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
  value: number;
  error: string;
}
type Action =
  | { type: "SET_VALUE"; value: number }
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
  const {
    id,
    index,
    title,
    description = "",

    defaultValue = 0,

    required,
    min,
    max,

    ...otherProps
  } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue,
    error: ""
  });

  const handleChange = (value: number) => {
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
      <InputStepper
        onChange={(_, num) => handleChange(num)}
        value={state.value}
        min={min}
        max={max}
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const Number = React.forwardRef(NumberBase) as typeof NumberBase;

export default Number;
