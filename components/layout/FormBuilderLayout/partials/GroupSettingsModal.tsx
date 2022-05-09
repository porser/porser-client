import {
  Button,
  Dialog,
  DialogActionBar,
  DialogBody,
  DialogHeader,
  FormControl,
  FormControlLabel,
  Switch,
  Text,
  TextArea,
  TextField,
  type DialogProps
} from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import * as React from "react";

const useStyles = makeStyles(
  ({ spacings: { spaces } }) => ({
    formControl: { "& + &": { marginTop: spaces[7].rem } },
    formControlSwitch: { "& + $formControl": { marginTop: spaces[7].rem } },
    formDescription: { marginBottom: spaces[7].rem }
  }),
  { name: "GroupSettingsModal" }
);

export type State = {
  title: string;
  description: string;
  showTitle: boolean;
  showDescription: boolean;
};

interface GroupSettingsModalBaseProps {
  className?: string;
  type: "create" | "edit";
  primaryCallback: (state: State) => void;
  initialState?: Partial<State>;
}

const GroupSettingsModal = (
  props: GroupSettingsModalBaseProps & DialogProps
) => {
  const {
    className,
    open,
    onClose,
    primaryCallback,
    initialState,
    type = "create",
    ...otherProps
  } = props;

  const classes = useStyles();

  const {
    title: initialTitle = "",
    description: initialDescription = "",
    showTitle: initialShowTitle = true,
    showDescription: initialShowDescription = true
  } = initialState || {};

  const [state, setState] = React.useState({
    title: initialTitle,
    description: initialDescription,
    showTitle: initialShowTitle,
    showDescription: initialShowDescription
  });

  const modalTitle = type === "create" ? "ایجاد گروه" : "ویرایش گروه";
  const primaryActionTitle = type === "create" ? "ایجاد کردن" : "ویرایش کردن";

  return (
    <Dialog
      onBackdropClick={() => void onClose?.()}
      onEscapeKeyUp={() => void onClose?.()}
      open={open}
      className={className}
      {...otherProps}
    >
      <DialogHeader title={modalTitle} />
      <DialogBody>
        <Text
          className={classes.formDescription}
          variant="body"
          color="textSecondary"
          as="p"
        >
          گروه سؤالات به صورت دسته‌ای و در یک مرحله به کاربران نمایش داده
          می‌شود.
        </Text>
        <FormControl className={classes.formControl} fluid required>
          <FormControlLabel htmlFor="group-title">عنوان</FormControlLabel>
          <TextField
            value={state.title}
            onChange={v => void setState(s => ({ ...s, title: v }))}
            inputProps={{ id: "group-title", dir: "auto" }}
          />
        </FormControl>
        <FormControl className={classes.formControlSwitch} fluid>
          <Switch
            checked={state.showTitle}
            onChange={v => void setState(s => ({ ...s, showTitle: v }))}
            label="عنوان به کاربران نمایش داده شود؟"
          />
        </FormControl>
        <FormControl className={classes.formControl} fluid>
          <FormControlLabel htmlFor="group-description">
            توضیحات
          </FormControlLabel>
          <TextArea
            minRows={3}
            value={state.description}
            onChange={v => void setState(s => ({ ...s, description: v }))}
            inputProps={{ id: "group-description", dir: "auto" }}
          />
        </FormControl>
        {state.description && (
          <FormControl className={classes.formControlSwitch} fluid>
            <Switch
              checked={state.showDescription}
              onChange={v => void setState(s => ({ ...s, showDescription: v }))}
              label="توضیحات به کاربران نمایش داده شود؟"
            />
          </FormControl>
        )}
      </DialogBody>
      <DialogActionBar>
        <Button
          label="لغو عملیات"
          variant="inlined"
          onClick={() => void onClose?.()}
        />
        <Button
          label={primaryActionTitle}
          variant="filled"
          color="primary"
          disabled={!state.title}
          onClick={() => void (primaryCallback(state), onClose?.())}
        />
      </DialogActionBar>
    </Dialog>
  );
};

export default GroupSettingsModal;
