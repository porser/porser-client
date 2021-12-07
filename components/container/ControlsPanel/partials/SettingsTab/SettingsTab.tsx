import { FormControl, FormControlLabel, TextArea, TextField } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import Segment from "../Segment";
import { CollapsibleSegment } from "./partials";
import useStyles from "./styles";

interface SettingsTabBaseProps {
  className?: string;
}

type SettingsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SettingsTabBaseProps
> &
  SettingsTabBaseProps;

const SettingsTabBase = (
  props: SettingsTabProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  const [openSegment, setOpenSegment] = React.useState(-1);

  const toggleSegment = (index: number) => {
    setOpenSegment(i => (i === index ? -1 : index));
  };

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Segment className={classes.segment}>
        <FormControl className={classes.formControl} fluid required>
          <FormControlLabel className={classes.formControlLabel}>
            عنوان فرم
          </FormControlLabel>
          <TextField placeholder="عنوان..." />
        </FormControl>
      </Segment>
      <CollapsibleSegment
        className={classes.segment}
        triggerTitle="صفحه شروع"
        isOpen={openSegment === 0}
        onTrigger={() => void toggleSegment(0)}
      >
        <FormControl className={classes.formControl} fluid required>
          <FormControlLabel className={classes.formControlLabel}>
            عنوان صفحه
          </FormControlLabel>
          <TextField placeholder="سلام، خوش آمدید!" />
        </FormControl>
        <FormControl className={classes.formControl} fluid>
          <FormControlLabel className={classes.formControlLabel}>
            متن توضیحات
          </FormControlLabel>
          <TextArea minRows="3" placeholder="شرکت‌کننده محترم..." />
        </FormControl>
      </CollapsibleSegment>
      <CollapsibleSegment
        className={classes.segment}
        triggerTitle="صفحه پایان"
        isOpen={openSegment === 1}
        onTrigger={() => void toggleSegment(1)}
      >
        <FormControl className={classes.formControl} fluid required>
          <FormControlLabel className={classes.formControlLabel}>
            عنوان صفحه
          </FormControlLabel>
          <TextField placeholder="خدا نگه‌دار!" />
        </FormControl>
        <FormControl className={classes.formControl} fluid>
          <FormControlLabel className={classes.formControlLabel}>
            متن توضیحات
          </FormControlLabel>
          <TextArea minRows="3" placeholder="ممنون از وقتی که گذاشتید..." />
        </FormControl>
      </CollapsibleSegment>
    </div>
  );
};

const SettingsTab = React.forwardRef(SettingsTabBase) as typeof SettingsTabBase;

export default SettingsTab;
