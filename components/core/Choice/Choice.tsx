import {
  Checkbox,
  CheckGroup,
  Flex,
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  Radio,
  RadioGroup,
  Text,
  TextField
} from "@sonnat/ui";
import * as React from "react";
import useStyles from "./styles";
import { validateInputByBrowser, random } from "utils";

interface ChoiceBaseProps {
  className?: string;

  defaultValue?: string | string[];
  placeholder?: string;
  multiple?: boolean;

  required?: boolean;
  maxRequired?: number;
  minRequired?: number;
  randomized?: boolean;
  includeOther?: boolean;
  otherLabel?: string;
  otherDescription?: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];

  id: string;
  title: string;
  index: number;
  description?: string;
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

const createOther = (
  content: { otherLabel: string; otherDescription: string },
  componentType: "checkbox" | "radio",
  classes: Record<string, string>
) => {
  const component =
    componentType === "checkbox" ? (
      <Checkbox label={content.otherLabel} value="other" />
    ) : (
      <Radio label={content.otherLabel} value="other" />
    );

  return (
    <Flex direction="column" className={classes.option}>
      {component}
      {!!content.otherDescription.length && (
        <Text
          variant="caption"
          color="textSecondary"
          className={classes.optionDescription}
        >
          {content.otherDescription}
        </Text>
      )}
    </Flex>
  );
};

const createOptions = (
  options: ChoiceProps["options"],
  componentType: "checkbox" | "radio",
  classes: Record<string, string>
) => {
  return options.map(option => {
    const Component =
      componentType === "checkbox" ? (
        <Checkbox label={option.label} value={option.value} />
      ) : (
        <Radio label={option.label} value={option.value} />
      );

    return (
      <Flex direction="column" key={option.value} className={classes.option}>
        {Component}
        {!!option.description && (
          <Text
            variant="caption"
            color="textSecondary"
            className={classes.optionDescription}
          >
            {option.description}
          </Text>
        )}
      </Flex>
    );
  });
};

const ChoiceBase = (props: ChoiceProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    id,
    index,
    title,
    description = "",

    defaultValue,

    required,
    options: optionsProp,
    maxRequired,
    minRequired,
    randomized = false,
    multiple = false,
    includeOther = false,
    otherLabel = "سایر",
    otherDescription = "",

    ...otherProps
  } = props;

  const classes = useStyles();

  const [state, dispatch] = React.useReducer(reducer, {
    value: defaultValue || (multiple ? [] : ""),
    error: ""
  });

  const handleChange = (value: string | string[]) => {
    if (value !== state.value) {
      const error = validateInputByBrowser(
        Array.isArray(value) ? value.join(",") : value,
        { required, maxRequired, minRequired }
      );

      if (!error) {
        dispatch({
          type: "SET_VALUE",
          value
        });
      }
      dispatch({
        type: "SET_ERROR",
        error
      });
    }
  };

  const options = React.useMemo(() => {
    if (randomized) {
      let availablePositions = Array(optionsProp.length) as undefined[];

      return optionsProp.map(() => {
        const r = random(0, availablePositions.length - 1);

        availablePositions = [
          ...availablePositions.slice(0, r),
          ...availablePositions.slice(r + 1)
        ];

        return optionsProp[r];
      });
    }

    return optionsProp;
  }, [randomized, optionsProp]);

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
      <FormControlLabel>{title}</FormControlLabel>
      {!!description && (
        <FormControlDescription>{description}</FormControlDescription>
      )}
      {multiple ? (
        <CheckGroup
          value={state.value as string[]}
          onChange={(_, selectedValues) => void handleChange(selectedValues)}
        >
          {createOptions(options, "checkbox", classes)}
          {includeOther &&
            createOther({ otherLabel, otherDescription }, "checkbox", classes)}
        </CheckGroup>
      ) : (
        <RadioGroup
          value={state.value as string}
          onChange={(_, selectedValue) => void handleChange(selectedValue)}
        >
          {createOptions(options, "radio", classes)}
          {includeOther &&
            createOther({ otherLabel, otherDescription }, "radio", classes)}
        </RadioGroup>
      )}
      {state.value === "other" && <TextField />}
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const Choice = React.forwardRef(ChoiceBase) as typeof ChoiceBase;

export default Choice;
