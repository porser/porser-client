import { FormatListGroup } from "@sonnat/icons";
import { Button, Flex, FlexItem, Text } from "@sonnat/ui";
import c from "classnames";
import FormBuilderContext, {
  type Field,
  type View
} from "context/FormBuilderContext";
import * as React from "react";
import { PageRow, FieldGroupRow, FieldRow } from "./partials";
import useStyles from "./styles";

interface FormBuilderSidebarBaseProps {
  className?: string;
}

type FormBuilderSidebarProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormBuilderSidebarBaseProps
> &
  FormBuilderSidebarBaseProps;

const FormBuilderSidebarBase = (
  props: FormBuilderSidebarProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, ...otherProps } = props;

  const classes = useStyles();

  const formBuilderContext = React.useContext(FormBuilderContext);
  const [selected, setSelected] = React.useState<Field[]>([]);

  const toggleSelectField = (checkedState: boolean, field: Field) => {
    if (checkedState) setSelected(s => [...s, field]);
    else setSelected(s => s.filter(i => i.id !== field.id));
  };

  const createFieldActions = React.useCallback((field: Field) => {
    const createConfirmationModal = (field: Field) => ({
      open: true,
      title: ["حذف سؤال", `"${field.title}"`].join(" "),
      content: (
        <Text variant="body" color="textSecondary" as="p">
          {[
            "شما در حال حذف کردن سؤال هستید.",
            "این عملیات بازگشت‌پذیر نیست، آیا از انجام این عملیات مطمئن هستید؟"
          ].join("\n")}
        </Text>
      ),
      primaryAction: {
        label: "بله، حذف شود",
        callback: () =>
          void formBuilderContext?.dispatch({
            type: "REMOVE_FIELD",
            fieldId: field.id
          })
      }
    });

    return {
      duplicate: () =>
        void formBuilderContext?.dispatch({
          type: "DUPLICATE_FIELD",
          fieldId: field.id
        }),
      delete: () =>
        void formBuilderContext?.dispatch({
          type: "SET_CONFIRMATION_MODAL",
          modal: createConfirmationModal(field)
        })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupFields = () => {
    formBuilderContext?.dispatch({
      type: "SET_GROUP_SETTINGS_MODAL",
      modal: {
        open: true,
        type: "create",
        initialState: undefined,
        primaryCallback: state => {
          formBuilderContext?.dispatch({
            type: "ADD_VIEW",
            view: { ...state, fields: selected }
          });
          formBuilderContext?.dispatch({
            type: "REMOVE_FIELDS",
            fields: selected
          });

          setSelected([]);
        }
      }
    });
  };

  const createGroupActions = React.useCallback(
    (view: View) => {
      const createConfirmationModal = (view: View) => ({
        open: true,
        title: ["حذف گروه", `"${view.title}"`].join(" "),
        content: (
          <Text variant="body" color="textSecondary" as="p">
            {[
              "شما در حال حذف کردن گروه و سؤالاتش هستید.",
              "این عملیات بازگشت‌پذیر نیست، آیا از انجام این عملیات مطمئن هستید؟"
            ].join("\n")}
          </Text>
        ),
        primaryAction: {
          label: "بله، حذف شود",
          callback: () =>
            void formBuilderContext?.dispatch({
              type: "REMOVE_VIEW",
              viewId: view.id
            })
        }
      });

      return {
        duplicate: () =>
          void formBuilderContext?.dispatch({
            type: "DUPLICATE_VIEW",
            viewId: view.id
          }),
        delete: () =>
          void formBuilderContext?.dispatch({
            type: "SET_CONFIRMATION_MODAL",
            modal: createConfirmationModal(view)
          }),
        edit: () =>
          void formBuilderContext?.dispatch({
            type: "SET_GROUP_SETTINGS_MODAL",
            modal: {
              open: true,
              type: "edit",
              initialState: {
                title: view.title,
                description: view.description,
                showTitle: view.showTitle,
                showDescription: view.showDescription
              },
              primaryCallback: state => {
                formBuilderContext?.dispatch({
                  type: "PATCH_VIEW",
                  view: { ...state, id: view.id }
                });
              }
            }
          }),
        ungroup: () =>
          void formBuilderContext?.dispatch({
            type: "UNGROUP",
            viewId: view.id
          })
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        actions={createGroupActions(view)}
      >
        {view.fields.map(field => (
          <FieldRow
            key={field.id}
            selectable={view.singly}
            selected={isFieldSelected(field)}
            onSelect={isSelected => void toggleSelectField(isSelected, field)}
            actions={createFieldActions(field)}
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
      <PageRow title="صفحه خوشامدگویی" className={classes.staticRow} />
      <PageRow title="صفحه پایانی" className={classes.staticRow} />
    </aside>
  );
};

const FormBuilderSidebar = React.forwardRef(
  FormBuilderSidebarBase
) as typeof FormBuilderSidebarBase;

export default FormBuilderSidebar;
