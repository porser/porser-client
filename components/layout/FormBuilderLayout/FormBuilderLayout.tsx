import { Button } from "@sonnat/ui";
import c from "classnames";
import FormBuilderSidebar from "components/container/FormBuilderSidebar";
import { ConfirmationModal } from "components/modal";
import FormBuilderContext from "context/FormBuilderContext";
import * as React from "react";
import { FieldSettingsModal, GroupSettingsModal } from "./partials";
import useStyles from "./styles";

interface FormBuilderLayoutBaseProps {
  className?: string;
  children: React.ReactNode;
}

type FormBuilderLayoutProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormBuilderLayoutBaseProps
> &
  FormBuilderLayoutBaseProps;

const FormBuilderLayout = (props: FormBuilderLayoutProps) => {
  const { className, children, ...otherProps } = props;

  const classes = useStyles();

  const formBuilderContext = React.useContext(FormBuilderContext);

  const confirmationModal = formBuilderContext?.state.confirmationModal;
  const groupSettingsModal = formBuilderContext?.state.groupSettingsModal;
  const fieldSettingsModal = formBuilderContext?.state.fieldSettingsModal;

  const dispatchAction = formBuilderContext?.dispatch;

  const closeConfirmationModal = () =>
    void dispatchAction?.({
      type: "SET_CONFIRMATION_MODAL",
      modal: { open: false }
    });

  const closeGroupSettingsModal = () =>
    void dispatchAction?.({
      type: "SET_GROUP_SETTINGS_MODAL",
      modal: { open: false }
    });

  const closeFieldSettingsModal = () =>
    void dispatchAction?.({
      type: "SET_FIELD_SETTINGS_MODAL",
      modal: { open: false }
    });

  return (
    <div className={c(className, classes.root)} {...otherProps}>
      <FormBuilderSidebar id="control-panel" className={classes.sidebar} />
      <main id="main" className={classes.main}>
        {children}
      </main>
      {fieldSettingsModal && (
        <FieldSettingsModal
          key={String(fieldSettingsModal.open)}
          open={fieldSettingsModal.open}
          type={fieldSettingsModal.type}
          fieldType={fieldSettingsModal.fieldType}
          fieldProps={fieldSettingsModal.fieldProps}
          onClose={closeFieldSettingsModal}
          primaryCallback={state =>
            void (fieldSettingsModal.primaryCallback(state),
            closeFieldSettingsModal())
          }
        />
      )}
      {groupSettingsModal && (
        <GroupSettingsModal
          open={groupSettingsModal.open}
          type={groupSettingsModal.type}
          initialState={groupSettingsModal.initialState}
          onClose={closeGroupSettingsModal}
          primaryCallback={state =>
            void (groupSettingsModal.primaryCallback(state),
            closeGroupSettingsModal())
          }
        />
      )}
      {confirmationModal && (
        <ConfirmationModal
          open={confirmationModal.open}
          title={confirmationModal.title}
          onBackdropClick={() => void closeConfirmationModal()}
          onEscapeKeyUp={() => void closeConfirmationModal()}
          actions={
            <>
              <Button
                label="لغو عملیات"
                variant="inlined"
                onClick={() => void closeConfirmationModal()}
              />
              <Button
                label={confirmationModal.primaryAction.label}
                variant="filled"
                color="primary"
                onClick={() =>
                  void (confirmationModal.primaryAction.callback(),
                  closeConfirmationModal())
                }
              />
            </>
          }
        >
          {confirmationModal.content}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default FormBuilderLayout;
