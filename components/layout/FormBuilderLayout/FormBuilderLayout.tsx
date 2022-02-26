import { Button } from "@sonnat/ui";
import c from "classnames";
import FormBuilderSidebar from "components/container/FormBuilderSidebar";
import GroupSettingsModal from "components/container/FormBuilderSidebar/partials/GroupSettingsModal";
import { ConfirmationModal } from "components/modals";
import FormBuilderContext from "context/FormBuilderContext";
import * as React from "react";
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

  const dispatchAction = formBuilderContext?.dispatch;

  const closeConfirmationModal = () =>
    void dispatchAction?.({
      type: "SET_CONFIRMATION_MODAL",
      modal: { open: false }
    });

  const closeGroupsSettingsModal = () =>
    void dispatchAction?.({
      type: "SET_GROUP_SETTINGS_MODAL",
      modal: { open: false }
    });

  return (
    <div className={c(className, classes.root)} {...otherProps}>
      <FormBuilderSidebar id="control-panel" className={classes.sidebar} />
      <main id="main" className={classes.main}>
        {children}
      </main>
      {groupSettingsModal && groupSettingsModal.open && (
        <GroupSettingsModal
          open
          type={groupSettingsModal.type}
          initialState={groupSettingsModal.initialState}
          onClose={closeGroupsSettingsModal}
          primaryCallback={state =>
            void (groupSettingsModal.primaryCallback(state),
            closeGroupsSettingsModal())
          }
        />
      )}
      {confirmationModal && confirmationModal.open && (
        <ConfirmationModal
          open
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
          {confirmationModal?.content}
        </ConfirmationModal>
      )}
    </div>
  );
};

export default FormBuilderLayout;
