import { FormatListGroup } from "@sonnat/icons";
import { Button, Flex, FlexItem, Text } from "@sonnat/ui";
import c from "classnames";
import FormBuilderContext, {
  deleteField,
  deleteGroup,
  duplicateField,
  duplicateGroup,
  editGroup,
  group,
  ungroup,
  type Field,
  type IContext,
  type View
} from "context/FormBuilderContext";
import * as React from "react";
import { createSlotId } from "utils";
import { FieldGroupRow, FieldRow, PageRow } from "./partials";
import useStyles from "./styles";

interface FormBuilderSidebarBaseProps {
  className?: string;
}

type FormBuilderSidebarProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormBuilderSidebarBaseProps
> &
  FormBuilderSidebarBaseProps;

const createFieldActions =
  (dispatch?: IContext["dispatch"]) => (field: Field) => {
    const actions = {
      duplicate: () => void 0 as void,
      delete: () => void 0 as void
    };

    if (!dispatch) return actions;

    actions.duplicate = () => void duplicateField(dispatch)(field);
    actions.delete = () => void deleteField(dispatch)(field);

    return actions;
  };

const createGroupActions =
  (dispatch?: IContext["dispatch"]) => (view: View) => {
    const actions = {
      duplicate: () => void 0 as void,
      delete: () => void 0 as void,
      edit: () => void 0 as void,
      ungroup: () => void 0 as void
    };

    if (!dispatch) return actions;

    actions.duplicate = () => void duplicateGroup(dispatch)(view);
    actions.delete = () => void deleteGroup(dispatch)(view);
    actions.edit = () => void editGroup(dispatch)(view);
    actions.ungroup = () => void ungroup(dispatch)(view);

    return actions;
  };

const FormBuilderSidebarBase = (
  props: FormBuilderSidebarProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  const formBuilderContext = React.useContext(FormBuilderContext);
  const [selected, setSelected] = React.useState<Field[]>([]);

  const dispatch = formBuilderContext?.dispatch;

  const toggleSelectField = (checkedState: boolean, field: Field) => {
    if (checkedState) setSelected(s => [...s, field]);
    else setSelected(s => s.filter(i => i.id !== field.id));
  };

  const groupFields = () => {
    if (!dispatch) return;
    group(dispatch)(selected, () => void setSelected([]));
  };

  const isFieldSelected = (field: Field) =>
    !!selected.find(f => f.id === field.id);

  const renderView = (view: View) => {
    return (
      <FieldGroupRow
        singly={view.singly}
        key={view.id}
        id={view.id}
        title={view.title}
        empty={view.fields.length === 0}
        actions={createGroupActions(dispatch)(view)}
      >
        {view.fields.map(field => (
          <FieldRow
            key={field.id}
            selectable={view.singly}
            selected={isFieldSelected(field)}
            onSelect={isSelected => void toggleSelectField(isSelected, field)}
            actions={createFieldActions(dispatch)(field)}
            data={field}
          />
        ))}
      </FieldGroupRow>
    );
  };

  return (
    <aside ref={ref} className={c(className, classes.root)} {...otherProps}>
      <Flex
        mainAxisAlignment="between"
        crossAxisAlignment="center"
        className={classes.heading}
      >
        <Text variant="subtitle">پرسش‌نامه</Text>
        <FlexItem crossAxisSelfAlignment="center">
          <Button
            label="ایجاد گروه"
            size="small"
            leadingIcon={<FormatListGroup />}
            onClick={() => void groupFields()}
            variant="inlined"
            disabled={selected.length === 0}
          />
        </FlexItem>
      </Flex>
      <Flex direction="column" className={classes.body}>
        {formBuilderContext?.state.form?.views.map(view => renderView(view))}
      </Flex>
      <PageRow
        id={createSlotId("start")}
        title="صفحه خوشامدگویی"
        className={classes.staticRow}
      />
      <PageRow
        id={createSlotId("end")}
        title="صفحه پایانی"
        className={classes.staticRow}
      />
    </aside>
  );
};

const FormBuilderSidebar = React.forwardRef(
  FormBuilderSidebarBase
) as typeof FormBuilderSidebarBase;

export default FormBuilderSidebar;
