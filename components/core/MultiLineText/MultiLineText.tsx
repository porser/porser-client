import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  TextArea
} from "@sonnat/ui";
import * as React from "react";
import validateInputByBrowser from "utils/validateInputByBrowser";
import useFormContext from "../FormWrapper/useContext";

interface MultiLineTextBaseProps {
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
  viewId: string;
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
  const {
    id,
    index,
    title,
    viewId,
    description = "",

    defaultValue = "",
    placeholder,

    required,
    pattern,
    minLength,
    maxLength,

    ...otherProps
  } = props;

  const { setFieldValidity, setFieldValue, initializeField, views } =
    useFormContext();

  const viewState = views[viewId];

  const [state, dispatch] = React.useReducer(reducer, {
    value: (viewState?.[id].value as string) || defaultValue,
    error: ""
  });

  const handleChange = (value: string) => {
    if (value !== state.value) {
      const error = validateInputByBrowser(value, {
        required,
        pattern,
        minLength,
        maxLength
      });

      setFieldValidity(viewId, { fieldId: id, isValid: !error });
      setFieldValue(viewId, { fieldId: id, value });

      dispatch({
        type: "SET_ERROR",
        error
      });
      dispatch({
        type: "SET_VALUE",
        value
      });
    }
  };

  React.useEffect(() => {
    const error = validateInputByBrowser(state.value, {
      required,
      pattern,
      minLength,
      maxLength
    });

    initializeField(viewId, {
      isValid: !error,
      value: state.value,
      fieldId: id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <TextArea
        onChange={handleChange}
        value={state.value}
        placeholder={placeholder}
        inputProps={{
          id: ids.input,
          "aria-describedby": description.length ? ids.descriptor : undefined
        }}
        autoResize
        minRows={3}
      />
      {!!state.error && (
        <FormControlFeedback>{state.error}</FormControlFeedback>
      )}
    </FormControl>
  );
};

const MultiLineText = React.memo(
  React.forwardRef(MultiLineTextBase)
) as typeof MultiLineTextBase;

export default MultiLineText;
