import {
  FormControl,
  FormControlDescription,
  FormControlFeedback,
  FormControlLabel,
  InputStepper
} from "@sonnat/ui";
import useFormContext from "modules/form/components/FormWrapper/useContext";
import * as React from "react";
import validateInputByBrowser from "utils/validateInputByBrowser";

interface NumberBaseProps {
  className?: string;

  defaultValue?: number;

  pattern?: string;
  min?: number;
  max?: number;
  required?: boolean;

  title?: string;
  description?: string;
  id: string;
  index: number;
  viewId: string;
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
    viewId,
    description,

    defaultValue = 0,

    required,
    min,
    max,

    ...otherProps
  } = props;

  const formContext = useFormContext();

  const viewState = formContext?.views[viewId];

  const [state, dispatch] = React.useReducer(reducer, {
    value: (viewState?.[id].value as number) || defaultValue,
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

      formContext?.setFieldValidity(viewId, { fieldId: id, isValid: !error });
      formContext?.setFieldValue(viewId, { fieldId: id, value });

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

  React.useEffect(() => {
    const error = validateInputByBrowser(state.value, {
      required,
      min,
      max,
      type: "number"
    });

    formContext?.initializeField(viewId, {
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
      {!!title?.length && (
        <FormControlLabel htmlFor={ids.input}>{title}</FormControlLabel>
      )}
      {!!description?.length && (
        <FormControlDescription id={ids.descriptor}>
          {description}
        </FormControlDescription>
      )}
      <InputStepper
        onChange={value => handleChange(value)}
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

const Number = React.memo(React.forwardRef(NumberBase)) as typeof NumberBase;

export default Number;
