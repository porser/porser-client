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
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  title: string;
  description?: string;
  id: string;
  index: number;
}

type MultiLineTextProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof MultiLineTextBaseProps
> &
  MultiLineTextBaseProps;

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

const MultiLineTextBase = (
  props: MultiLineTextProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { id, index, title, description, defaultValue, ...otherProps } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || "",
    error: ""
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

  const ids = {
    input: `textarea-${id}-${index}`,
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
      {!!description && (
        <FormControlDescription id={ids.descriptor}>
          {description}
        </FormControlDescription>
      )}
      <TextArea
        onChange={handleChange}
        value={state.value}
        inputProps={{ id: ids.input, "aria-describedby": ids.descriptor }}
        autoResize
        minRows={3}
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const MultiLineText = React.forwardRef(
  MultiLineTextBase
) as typeof MultiLineTextBase;

export default MultiLineText;
