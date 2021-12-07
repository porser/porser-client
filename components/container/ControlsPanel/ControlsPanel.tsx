import { Tab, TabBar } from "@sonnat/ui";
import c from "classnames";
import { Context as FormBuilderContext } from "pages/form/build/[projectId]";
import * as React from "react";
import { FieldsTab, SettingsTab, ViewsTab } from "./partials";
import useStyles from "./styles";

interface ControlsPanelBaseProps {
  className?: string;
}

type ControlsPanelProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof ControlsPanelBaseProps
> &
  ControlsPanelBaseProps;

const ControlsPanelBase = (
  props: ControlsPanelProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();
  const { activeTab, setActiveTab } = React.useContext(FormBuilderContext);

  const handleTabChange = (identifier: number) => {
    setActiveTab(identifier);
  };

  return (
    <aside
      id="controls-panel"
      ref={ref}
      className={c(className, classes.root)}
      {...otherProps}
    >
      <TabBar
        className={classes.tabs}
        variant="fluid"
        activeTab={activeTab}
        onChange={(_, identifier) => void handleTabChange(identifier as number)}
      >
        <Tab label="تنظیمات" />
        <Tab label="گروه سؤالات" />
        <Tab label="سؤالات" />
      </TabBar>
      <div className={classes.container}>
        {activeTab === 0 && <SettingsTab />}
        {activeTab === 1 && <ViewsTab />}
        {activeTab === 2 && <FieldsTab />}
      </div>
      {/* <div className={classes.actionBar}>
        <Button
          label="ذخیره‌سازی"
          color="primary"
          disabled
          className={classes.primaryActionBtn}
        />
      </div> */}
    </aside>
  );
};

const ControlsPanel = React.forwardRef(
  ControlsPanelBase
) as typeof ControlsPanelBase;

export default ControlsPanel;
