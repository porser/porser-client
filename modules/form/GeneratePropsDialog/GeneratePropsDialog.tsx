import {
  Button,
  Dialog,
  DialogActionBar,
  DialogBody,
  DialogHeader,
  FormControl,
  FormControlDescription,
  FormControlLabel,
  InputStepper,
  Select,
  SelectOption,
  Switch,
  TextArea,
  TextField,
  type DialogProps
} from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import c from "classnames";
import * as React from "react";
import type { AnyObject } from "types";
import type { ModalSchema } from "../createModalSchema";
import ChoiceOptionCreator from "./ChoiceOptionCreator";

const useStyles = makeStyles(
  ({ colors, spacings: { spacer }, typography: { pxToRem, variants } }) => ({
    root: {},
    formLabel: { ...variants.subtitleSmall },
    formControl: {
      "& + &": {
        marginTop: spacer.rem,
        paddingTop: spacer.rem,
        borderTop: `1px solid ${colors.divider.dark}`
      },
      "& &": {
        marginTop: spacer.rem
      }
    },
    field: {},
    toggleStep: {}
  }),
  { name: "GeneratePropsDialog" }
);

export type State = Record<string, unknown>;

interface GeneratePropsDialogBaseProps {
  title: string;
  onCancel: () => void;
  className?: string;
  initialState: AnyObject | null;
  modalSchema: ModalSchema[] | null;
  primaryAction: {
    callback: (state: State) => void;
    label: string;
  };
}

type GeneratePropsDialogProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof GeneratePropsDialogBaseProps
> &
  GeneratePropsDialogBaseProps;

const GeneratePropsDialog = (props: GeneratePropsDialogProps & DialogProps) => {
  const {
    title,
    onCancel,
    primaryAction,
    modalSchema,
    initialState,
    className,
    ...otherProps
  } = props;

  const classes = useStyles();

  const [state, setState] = React.useState<State>(initialState ?? {});

  if (!modalSchema) {
    if (process.env.NODE_ENV !== "production")
      // eslint-disable-next-line no-console
      console.error("Invalid `modalSchema` provided!");
    return null;
  }

  const createController = (args: { id: string; fieldSchema: ModalSchema }) => {
    const {
      id,
      fieldSchema: { label, name, required, type, description, toggleChildren }
    } = args;

    const createSelectOptions = () => {
      type Option = { value: string; label: string; description?: string };

      if (!state.options) return [];

      return (state.options as Option[]).map(({ value, label }, idx) => (
        <SelectOption
          key={idx.toString() + value + label}
          value={value}
          label={label}
        />
      ));
    };

    switch (type) {
      case "boolean": {
        const component = (
          <Switch
            className={classes.field}
            name={name}
            label={label}
            checked={state[name] as boolean}
            onChange={checkedState =>
              void setState(s => ({ ...s, [name]: checkedState }))
            }
            inputProps={{
              id: `field-prop-${id}`,
              "aria-describedby": `field-description-${id}`
            }}
          />
        );

        const children = toggleChildren
          ? toggleChildren.map((child, index) => {
              const id = `${child.name}-${index.toString()}`;
              const key = child.name + child.label + index.toString();

              return (
                <FormControl
                  fluid
                  key={key}
                  className={classes.formControl}
                  required={child.required}
                >
                  <FormControlLabel
                    className={classes.formLabel}
                    htmlFor={`field-prop-${id}`}
                  >
                    {child.label}
                  </FormControlLabel>
                  {child.description && (
                    <FormControlDescription id={`field-description-${id}`}>
                      {child.description}
                    </FormControlDescription>
                  )}
                  {createController({
                    id: `${child.name}-${index.toString()}`,
                    fieldSchema: child
                  })}
                </FormControl>
              );
            })
          : null;

        return (
          <>
            {component}
            {state[name] && children}
          </>
        );
      }
      case "longstring": {
        return (
          <TextArea
            className={classes.field}
            name={name}
            value={state[name] as string}
            onChange={value => void setState(s => ({ ...s, [name]: value }))}
            inputProps={{
              id: `field-prop-${id}`,
              "aria-describedby": `field-description-${id}`
            }}
          />
        );
      }
      case "number": {
        return (
          <InputStepper
            className={classes.field}
            name={name}
            value={state[name] as number}
            onChange={value => void setState(s => ({ ...s, [name]: value }))}
            inputProps={{
              id: `field-prop-${id}`,
              "aria-describedby": `field-description-${id}`
            }}
          />
        );
      }
      case "string": {
        return (
          <TextField
            className={classes.field}
            name={name}
            value={state[name] as string}
            onChange={value => void setState(s => ({ ...s, [name]: value }))}
            inputProps={{
              id: `field-prop-${id}`,
              "aria-describedby": `field-description-${id}`
            }}
          />
        );
      }
      case "options": {
        return (
          <ChoiceOptionCreator formState={state} setFormState={setState} />
        );
      }
      case "choices": {
        return state.multiple == null ? null : state.multiple === true ? (
          <Select
            multiple
            className={classes.field}
            id={`field-prop-${id}`}
            aria-describedby={`field-description-${id}`}
            value={state[name] as string[]}
            onChange={value => void setState(s => ({ ...s, [name]: value }))}
          >
            {createSelectOptions()}
          </Select>
        ) : (
          <Select
            className={classes.field}
            id={`field-prop-${id}`}
            aria-describedby={`field-description-${id}`}
            value={state[name] as string}
            onChange={value => void setState(s => ({ ...s, [name]: value }))}
          >
            {createSelectOptions()}
          </Select>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Dialog className={c(className, classes.root)} {...otherProps}>
      <DialogHeader title={title} />
      <DialogBody>
        {modalSchema.map((fieldSchema, index) => {
          const id = `${fieldSchema.name}-${index.toString()}`;
          const key = fieldSchema.name + fieldSchema.label + index.toString();

          return (
            <FormControl
              fluid
              key={key}
              className={classes.formControl}
              required={fieldSchema.required}
            >
              {fieldSchema.type !== "boolean" && (
                <FormControlLabel
                  className={classes.formLabel}
                  htmlFor={`field-prop-${id}`}
                >
                  {fieldSchema.label}
                </FormControlLabel>
              )}
              {fieldSchema.description && (
                <FormControlDescription id={`field-description-${id}`}>
                  {fieldSchema.description}
                </FormControlDescription>
              )}
              {createController({ id, fieldSchema })}
            </FormControl>
          );
        })}
      </DialogBody>
      <DialogActionBar>
        <Button
          label="لغو عملیات"
          variant="inlined"
          onClick={() => void onCancel()}
        />
        <Button
          label={primaryAction.label}
          variant="filled"
          color="primary"
          onClick={() => void primaryAction.callback(state)}
        />
      </DialogActionBar>
    </Dialog>
  );
};

export default GeneratePropsDialog;
