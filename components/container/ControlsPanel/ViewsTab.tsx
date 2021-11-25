import * as React from "react";
import c from "classnames";
import { Button, Text, TextArea, TextField } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import { Plus } from "@sonnat/icons";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem }
    } = theme;

    return {
      root: { paddingTop: pxToRem(16) },
      title: {},
      description: { marginTop: pxToRem(16), marginBottom: pxToRem(16) },
      groups: {},
      groupsRow: { display: "flex", alignItems: "center" },
      groupsTitle: { marginBottom: pxToRem(8), marginLeft: "auto" },
      group: { "& > * + *": { marginTop: pxToRem(8) } }
    };
  },
  { name: "ViewsTab" }
);

interface ViewsTabBaseProps {
  className?: string;
}

type ViewsTabProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ViewsTabBaseProps
> &
  ViewsTabBaseProps;

const ViewsTabBase = (props: ViewsTabProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Text display="block" className={classes.title} variant="h6">
        گروه سؤالات
      </Text>
      <Text display="block" className={classes.description} variant="body">
        در اینجا گروه‌هایی که می‌خواهید سؤالات در آن‌ها نمایش داده شوند را مشخص
        می‌کنید.
      </Text>
      <div className={classes.groups}>
        <div className={classes.groupsRow}>
          <Text display="block" className={classes.groupsTitle} variant="h6">
            گروه‌ها
          </Text>
          <Button
            aria-label="اضافه کردن گروه"
            variant="inlined"
            leadingIcon={<Plus />}
          />
        </div>
        <div className={classes.group}>
          <TextField fluid placeholder="عنوان گروه" />
          <TextArea fluid placeholder="توضیحات گروه" />
        </div>
      </div>
    </div>
  );
};

const ViewsTab = React.forwardRef(ViewsTabBase) as typeof ViewsTabBase;

export default ViewsTab;
