import c from "classnames";
import * as React from "react";
import { TabBar, Tab } from "@sonnat/ui";
import useStyles from "./styles";
import FormSettingsTab from "./FormSettingsTab";
import ViewsTab from "./ViewsTab";
import FieldsTab from "./FieldsTab";
import FormBuilderContext from "components/layout/FormBuilderLayout/Context";

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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = React.useContext(FormBuilderContext)!;

  const handleTabChange = (identifier: number) => {
    context.setActiveTab(identifier);
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
        activeTab={context.activeTab}
        onChange={(_, identifier) => void handleTabChange(identifier as number)}
      >
        <Tab label="تنظیمات عمومی" />
        <Tab label="نمایش فرم" />
        <Tab label="سؤالات" />
      </TabBar>
      <div className={classes.container}>
        {context.activeTab === 0 && <FormSettingsTab />}
        {context.activeTab === 1 && <ViewsTab />}
        {context.activeTab === 2 && <FieldsTab />}
      </div>
    </aside>
  );
};

const ControlsPanel = React.forwardRef(
  ControlsPanelBase
) as typeof ControlsPanelBase;

export default ControlsPanel;
