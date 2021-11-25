import * as React from "react";
import c from "classnames";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import {
  Button,
  Text,
  Select,
  TextField,
  FormControl,
  FormControlLabel,
  Switch,
  Row,
  Column
} from "@sonnat/ui";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem }
    } = theme;

    return {
      root: { paddingTop: pxToRem(16) },
      title: {},
      description: { marginTop: pxToRem(16), marginBottom: pxToRem(16) },
      formControl: { "& + &": { marginTop: pxToRem(32) } },
      fieldImage: { width: "100%", margin: `${pxToRem(8)} 0` },
      switchRow: { display: "flex", alignItems: "center" },
      switch: { marginRight: "auto" },
      addBtn: { width: "100%", marginTop: pxToRem(32) }
    };
  },
  { name: "FieldsTab" }
);

interface FieldsTabBaseProps {
  className?: string;
}

type FieldsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldsTabBaseProps
> &
  FieldsTabBaseProps;

const FieldsTabBase = (
  props: FieldsTabProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Text display="block" className={classes.title} variant="h6">
        سؤالات
      </Text>
      <Text display="block" className={classes.description} variant="body">
        در اینجا سؤالات خود را تعریف کنید.
      </Text>
      <FormControl className={classes.formControl} fluid required>
        <FormControlLabel>عنوان سؤال</FormControlLabel>
        <TextField placeholder="سؤال خود را اینجا بنویسید" />
      </FormControl>
      <FormControl className={classes.formControl} fluid>
        <FormControlLabel>توضیحات</FormControlLabel>
        <TextField placeholder="توضیحات سؤال را وارد کنید" />
      </FormControl>
      <FormControl className={classes.formControl} fluid required>
        <FormControlLabel>گروه سؤال</FormControlLabel>
        <Select placeholder="گروه سؤال را انتخاب کنید" />
      </FormControl>
      <FormControl className={classes.formControl} fluid required>
        <FormControlLabel>نوع سؤال</FormControlLabel>
        <Row>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/textfield.svg"
              alt="فیلد تک خطی"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/textarea.svg"
              alt="فیلد چند خطی"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/checkbox.svg"
              alt="فیلد انتخابی"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/conditionfield.svg"
              alt="فیلد شرطی"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/dropdown.svg"
              alt="فیلد کشویی"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/plaintext.svg"
              alt="متن ساده"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/sortfield.svg"
              alt="فیلد اولویت"
            />
          </Column>
          <Column all="3">
            <img
              className={classes.fieldImage}
              src="/static/media/rangefield.svg"
              alt="فیلد بازه‌ای"
            />
          </Column>
        </Row>
      </FormControl>
      <div className={c(classes.formControl, classes.switchRow)}>
        <Text variant="body">سؤال اجباری باشد</Text>
        <Switch className={classes.switch} />
      </div>
      <Button
        label="اضافه کردن سؤال"
        color="primary"
        size="large"
        className={classes.addBtn}
      />
    </div>
  );
};

const FieldsTab = React.forwardRef(FieldsTabBase) as typeof FieldsTabBase;

export default FieldsTab;
