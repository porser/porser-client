import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  CheckGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Flex,
  Text,
  TextField
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
  max?: number;
  randomized?: boolean;
  options: Option[];
  title: string;
  description?: string;
  id: string;
  index: number;
  allowOther?: boolean;
  otherLabel?: string;
  otherDescription?: string;
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
  const {
    id,
    index,
    title,
    description,
    defaultValue,
    options,
    multiple = false,
    max,
    required,
    allowOther,
    otherLabel,
    otherDescription
  } = props;
  console.log(props);
  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || (multiple ? [] : ""),
    error: ""
  });

  const handleChange = (value: string | string[]) => {
    console.log(value);
    if (value !== state.value) {
      const error = validateInputByBrowser(
        Array.isArray(value) ? value.join("") : value,
        { required, maxLength: max }
      );
      if (!error) {
        dispatch({
          type: "SET_VALUE",
          value
        });
      }
      dispatch({
        type: "SET_ERROR",
        error: error.replace("حرف", "تا")
      });
    }
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
      <FormControlLabel>{title}</FormControlLabel>
      {!!description && (
        <FormControlDescription>{description}</FormControlDescription>
      )}
      {multiple ? (
        <CheckGroup
          value={state.value as string[]}
          onChange={(_, selectedValues) => void handleChange(selectedValues)}
          style={{ gap: 16 }}
        >
          {options.map(option => (
            <Flex direction="column" key={option.value}>
              <Checkbox label={option.label} value={option.value} />
              {!!option.description && (
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={{ whiteSpace: "pre-wrap", marginRight: 12 }}
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
          style={{ gap: 16 }}
        >
          {options.map(option => (
            <Flex direction="column" key={option.value}>
              <Radio label={option.label} value={option.value} />
              {!!option.description && (
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={{ marginRight: 12 }}
                >
                  {option.description}
                </Text>
              )}
            </Flex>
          ))}
          {allowOther && (
            <Flex direction="column">
              <Radio label={otherLabel || "سایر"} value="-1" />
              {!!otherDescription && (
                <Text
                  variant="caption"
                  color="textSecondary"
                  style={{ marginRight: 12 }}
                >
                  {otherDescription}
                </Text>
              )}
            </Flex>
          )}
        </RadioGroup>
      )}

      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
      {state.value === "-1" && <TextField />}
    </FormControl>
  );
};

const Choice = React.forwardRef(ChoiceBase) as typeof ChoiceBase;

export default Choice;
