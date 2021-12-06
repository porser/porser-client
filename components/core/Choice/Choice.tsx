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
import useFormContext from "../FormWrapper/useContext";

interface ChoiceBaseProps {
  className?: string;

  defaultValue?: string | string[];
  placeholder?: string;
  multiple?: boolean;

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
  viewId: string;
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
      <Checkbox
        id={`${content.otherLabel}`}
        label={content.otherLabel}
        value="other"
      />
    ) : (
      <Radio
        id={`${content.otherLabel}`}
        label={content.otherLabel}
        value="other"
      />
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
  return options.map(({ label, value, description }) => {
    const Component =
      componentType === "checkbox" ? (
        <Checkbox id={`${label}/${value}`} label={label} value={value} />
      ) : (
        <Radio id={`${label}/${value}`} label={label} value={value} />
      );

    return (
      <Flex direction="column" key={value} className={classes.option}>
        {Component}
        {!!description && (
          <Text
            variant="caption"
            color="textSecondary"
            className={classes.optionDescription}
          >
            {description}
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
    viewId,
    description = "",

    defaultValue,

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

  const { setFieldValidity, setFieldValue, initializeField, views } =
    useFormContext();

  const viewState = views[viewId];

  const [otherwise, setOtherwise] = React.useState(
    viewState?.[id].otherValue || ""
  );

  const { current: defaultState } = React.useRef(
    defaultValue || (multiple ? [] : "")
  );

  const [state, dispatch] = React.useReducer(reducer, {
    value:
      (viewState?.[id].value as string | string[] | undefined) || defaultState,
    error: ""
  });

  const exactRequired =
    minRequired != null && maxRequired != null && maxRequired === minRequired
      ? minRequired
      : 0;

  const handleChange = (value: string | string[]) => {
    if (value !== state.value) {
      const error = validateInputByBrowser(
        Array.isArray(value) ? value.join(",") : value,
        { maxRequired, minRequired, exactRequired }
      );

      setFieldValidity(viewId, { fieldId: id, isValid: !error });
      setFieldValue(viewId, { fieldId: id, value, otherValue: otherwise });

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

  const handleOtherwise = (value: string) => {
    setOtherwise(value);
    setFieldValue(viewId, {
      fieldId: id,
      value: state.value,
      otherValue: value
    });
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

  React.useEffect(() => {
    const error = validateInputByBrowser(
      Array.isArray(state.value) ? state.value.join(",") : state.value,
      { maxRequired, minRequired, exactRequired }
    );

    if (state.value !== defaultState) {
      dispatch({
        type: "SET_ERROR",
        error
      });
    }

    initializeField(viewId, {
      isValid: !error,
      value: state.value,
      otherValue: otherwise,
      fieldId: id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <FormControl
        fluid
        hasError={!!state.error}
        required={!!minRequired && minRequired >= 1}
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
              createOther(
                { otherLabel, otherDescription },
                "checkbox",
                classes
              )}
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
        {!!state.error && (
          <FormControlFeedback>{state.error}</FormControlFeedback>
        )}
      </FormControl>
      {state.value.includes("other") && (
        <FormControl fluid className={classes.otherwise}>
          <FormControlLabel htmlFor={`field-${id}-${index}`}>
            سایر موارد
          </FormControlLabel>
          <FormControlDescription id={`descriptor-${id}-${index}`}>
            لطفاً موارد خود را نام ببرید.
          </FormControlDescription>
          <TextField
            value={otherwise.replace("other-", "")}
            inputProps={{
              id: `field-${id}-${index}`,
              "aria-describedby": `descriptor-${id}-${index}`
            }}
            onChange={e => void handleOtherwise(e.target.value)}
          />
        </FormControl>
      )}
    </React.Fragment>
  );
};

const Choice = React.forwardRef(ChoiceBase) as typeof ChoiceBase;

export default Choice;
