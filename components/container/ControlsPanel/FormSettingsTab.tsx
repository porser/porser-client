import { ChevronDown, ChevronLeft } from "@sonnat/icons";
import {
  Button,
  FormControl,
  FormControlLabel,
  Text,
  TextArea,
  TextField
} from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import c from "classnames";
import FormBuilderContext from "components/layout/FormBuilderLayout/Context";
import * as React from "react";
import { UnmountClosed as Collapse } from "react-collapse";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {},
      segment: {
        borderBottom: `1px solid ${colors.divider}`,
        paddingRight: pxToRem(32),
        paddingLeft: pxToRem(32),
        marginRight: pxToRem(-32),
        marginLeft: pxToRem(-32),
        paddingBottom: pxToRem(16)
      },
      segmentTitle: {},
      segmentTrigger: {
        paddingTop: pxToRem(16),
        cursor: "pointer"
      },
      segmentContent: { paddingTop: pxToRem(16) },
      formControl: { "& + &": { marginTop: pxToRem(32) } },
      formControlLabel: { ...variants.subtitle },
      collapse: { transition: "height 240ms ease" },
      saveBtn: { width: "100%", marginTop: pxToRem(32) }
    };
  },
  { name: "FormSettingsTab" }
);

interface FormSettingsTabBaseProps {
  className?: string;
}

type FormSettingsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormSettingsTabBaseProps
> &
  FormSettingsTabBaseProps;

const FormSettingsTabBase = (
  props: FormSettingsTabProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = React.useContext(FormBuilderContext)!;

  const [openSegment, setOpenSegment] = React.useState(0);

  const handleSaveChanges = () => {
    context.setActiveTab(1);
  };

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div className={classes.segment}>
        <div
          role="button"
          onClick={() => void setOpenSegment(0)}
          className={classes.segmentTrigger}
        >
          {openSegment === 0 ? (
            <ChevronDown size={20} color="textSecondary" />
          ) : (
            <ChevronLeft size={20} color="textSecondary" />
          )}
          <Text className={classes.segmentTitle} variant="h6">
            صفحه خوشامد‌گویی
          </Text>
        </div>
        <Collapse
          theme={{ collapse: classes.collapse }}
          isOpened={openSegment === 0}
        >
          <div className={classes.segmentContent}>
            <FormControl className={classes.formControl} fluid required>
              <FormControlLabel className={classes.formControlLabel}>
                عنوان
              </FormControlLabel>
              <TextField placeholder="سلام، خوش آمدید!" />
            </FormControl>
            <FormControl className={classes.formControl} fluid required>
              <FormControlLabel className={classes.formControlLabel}>
                متن توضیحات
              </FormControlLabel>
              <TextArea minRows="3" placeholder="شرکت‌کننده محترم..." />
            </FormControl>
            <FormControl className={classes.formControl} fluid>
              <FormControlLabel className={classes.formControlLabel}>
                عنوان دکمه شروع
              </FormControlLabel>
              <TextField defaultValue="شروع کنید" />
            </FormControl>
          </div>
        </Collapse>
      </div>
      <div className={classes.segment}>
        <div
          role="button"
          onClick={() => void setOpenSegment(1)}
          className={classes.segmentTrigger}
        >
          {openSegment === 1 ? (
            <ChevronDown size={20} color="textSecondary" />
          ) : (
            <ChevronLeft size={20} color="textSecondary" />
          )}
          <Text className={classes.segmentTitle} variant="h6">
            صفحه پایان
          </Text>
        </div>
        <Collapse
          theme={{ collapse: classes.collapse }}
          isOpened={openSegment === 1}
        >
          <div className={classes.segmentContent}>
            <FormControl className={classes.formControl} fluid required>
              <FormControlLabel className={classes.formControlLabel}>
                عنوان
              </FormControlLabel>
              <TextField placeholder="خدا نگه‌دار!" />
            </FormControl>
            <FormControl className={classes.formControl} fluid required>
              <FormControlLabel className={classes.formControlLabel}>
                متن توضیحات
              </FormControlLabel>
              <TextArea minRows="3" placeholder="ممنون از وقتی که گذاشتید..." />
            </FormControl>
          </div>
        </Collapse>
      </div>
      <Button
        label="ذخیره‌سازی"
        size="large"
        color="primary"
        onClick={() => void handleSaveChanges()}
        className={classes.saveBtn}
      />
    </div>
  );
};

const FormSettingsTab = React.forwardRef(
  FormSettingsTabBase
) as typeof FormSettingsTabBase;

export default FormSettingsTab;
