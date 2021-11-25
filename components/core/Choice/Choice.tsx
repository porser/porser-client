import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  SelectOption,
  TextField,
  Select,
  CheckGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Flex,
  Text
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateByBrowser";

type Option = {
  id: string;
  index: number;
  value: string;
  label: string;
  description?: string;
};
interface ChoiceBaseProps {
  className?: string;
  defaultValue?: string | string[];
  required?: boolean;
  multiple?: boolean;
  randomized?: boolean;
  options: Option[];
}

type ChoiceProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ChoiceBaseProps
> &
  ChoiceBaseProps;

interface FieldState {
  value: string | string[];
  error: string;
}
type Action =
  | { type: "SET_VALUE"; value: string | string[] }
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

const ChoiceBase = (props: ChoiceProps, ref: React.Ref<HTMLDivElement>) => {
  const { defaultValue, options, multiple = false, required } = props;

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || (multiple ? [""] : ""),
    error: ""
  });

  const handleChange = (value: string | string[]) => {
    if (value !== state.value) {
      const error = validateInputByBrowser(
        Array.isArray(value) ? value.join("") : value,
        { required }
      );
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
      {multiple ? (
        <CheckGroup
          value={state.value as string[]}
          onChange={(_, selectedValues) => void handleChange(selectedValues)}
        >
          {options.map(option => (
            <Flex direction="column" key={option.value}>
              <Checkbox label={option.label} value={option.value} />
              {!!option.description && (
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {option.description}
                </Text>
              )}
            </Flex>
          ))}
        </CheckGroup>
      ) : (
        <RadioGroup
          value={state.value as string}
          onChange={(_, selectedValue) => void handleChange(selectedValue)}
        >
          {options.map(option => (
            <Flex key={option.value}>
              <Radio label={option.label} value={option.value} />
              {!!option.description && (
                <Text variant="caption" color="textSecondary">
                  {option.description}
                </Text>
              )}
            </Flex>
          ))}
        </RadioGroup>
      )}

      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const Choice = React.forwardRef(ChoiceBase) as typeof ChoiceBase;

export default Choice;
