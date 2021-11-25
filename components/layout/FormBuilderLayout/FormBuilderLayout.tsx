import { Button, Column, Container, Divider, Row, Switch } from "@sonnat/ui";
import c from "classnames";
import { ControlsPanel } from "components/container";
import * as React from "react";
import WithHeader from "../WithHeader";
import useStyles from "./styles";
import FormBuilderContext from "./Context";

interface FormBuilderLayoutBaseProps {
  className?: string;
  children: React.ReactNode;
}

type FormBuilderLayoutProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormBuilderLayoutBaseProps
> &
  FormBuilderLayoutBaseProps;

const FormBuilderLayoutBase = (
  props: FormBuilderLayoutProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);

  const context = React.useMemo(() => {
    return {
      activeTab,
      setActiveTab
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <WithHeader>
        <main id="main" className={classes.main}>
          <Container>
            <div className={classes.meta}>
              <span className={classes.title}>عنوان پرسش‌نامه</span>
              <div className={classes.actions}>
                <Switch label="فعال" defaultChecked={true} size="large" />
                <Divider vertical className={classes.divider} />
                <Button
                  label="ثبت فرم"
                  color="primary"
                  size="large"
                  className={classes.saveFormBtn}
                />
              </div>
            </div>
            <FormBuilderContext.Provider value={context}>
              <Row>
                <Column all="4">
                  <ControlsPanel className={classes.controlsPanel} />
                </Column>
                <Column all="8">
                  <section id="form-result" className={classes.formResult}>
                    {children}
                  </section>
                </Column>
              </Row>
            </FormBuilderContext.Provider>
          </Container>
        </main>
      </WithHeader>
    </div>
  );
};

const FormBuilderLayout = React.forwardRef(
  FormBuilderLayoutBase
) as typeof FormBuilderLayoutBase;

export default FormBuilderLayout;
