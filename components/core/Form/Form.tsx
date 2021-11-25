import { Button, Card, Column, Container, Flex, Row, Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import View, { Action as ViewAction } from "../View";
import useStyles from "./styles";

interface FormBaseProps {
  className?: string;
  views: React.ReactNode;
  id: string;
  title: string;
  onSubmit: () => void;
}

type FormProps = Omit<React.ComponentPropsWithRef<"div">, keyof FormBaseProps> &
  FormBaseProps;

const FormBase = (props: FormProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    id,
    title,
    onSubmit,
    views: viewsProp,
    ...otherProps
  } = props;

  const classes = useStyles();

  const [activeView, setActiveView] = React.useState(-1);

  const handleSubmit = () => {
    viewActionRefs.current.forEach(x => {
      console.log(x, (x as React.RefObject<ViewAction>).current?.getStates());
    });

    if (onSubmit) onSubmit();
  };

  const handleNext = () => {
    setActiveView(activeView + 1);
  };
  const handlePrev = () => {
    setActiveView(activeView - 1);
  };

  const viewActionRefs = React.useRef<React.Ref<ViewAction>[]>([]);

  let index = 0;
  const views = React.Children.map(viewsProp, view => {
    if (!React.isValidElement(view)) return null;
    if (isFragment(view)) return null;
    if ((view as React.ReactElement).type !== View) return null;

    const viewActionRef = viewActionRefs.current[index++];

    return React.cloneElement(view, {
      ...(view as React.ReactElement).props,
      action: viewActionRef
    });
  });

  return (
    <div
      id={id}
      data-title={title}
      ref={ref}
      className={c(className, classes.root)}
      {...otherProps}
    >
      <Container>
        <Row>
          <Column all={{ size: 6, offset: 3 }}>
            {activeView === -1 && (
              <Flex
                direction="column"
                mainAxisAlignment="center"
                style={{
                  minHeight: "calc(100vh - 52px)",
                  gap: 20
                }}
              >
                <Flex direction="column">
                  <Text variant="h5">سلام بچه‌ها!</Text>
                  <Text variant="body">
                    خیلی خوشحالیم که ما (تیم پرسر) این سه روز رو کنار شما
                    گذروندیم. ایده‌ی ما درست کردن یه فرم‌ساز بود که محدودیت و
                    مشکلاتمون رو با فرم‌ساز‌های قبلی حل می‌کرد.
                    <br />
                    حالا می‌خوایم اولین فرمی که ساختیم رو با شما تست کنیم!
                  </Text>
                </Flex>
                <Flex mainAxisAlignment="center">
                  <Button
                    label="آماده‌ایم، بزن بریم!"
                    onClick={handleNext}
                    color="primary"
                  />
                </Flex>
              </Flex>
            )}
            {activeView === views?.length && (
              <Flex
                direction="column"
                mainAxisAlignment="center"
                style={{
                  minHeight: "100vh",
                  margin: "auto",
                  gap: 20
                }}
              >
                <Flex direction="column">
                  <Text variant="h5">ممنون که ارائه‌مون رو گوش دادید!</Text>
                  <Text variant="body">
                    امیدواریم که با رای و نظرتون بتونیم پرسر رو بهتر کنیم و
                    انگیزه‌ی بیشتری برای ادامه‌ش داشته‌باشیم. دوستون داریم. بوس
                    به همه‌تون :*
                  </Text>
                </Flex>
              </Flex>
            )}
          </Column>
        </Row>

        {activeView !== -1 && activeView <= views?.length && (
          <div className={classes.progress}>
            <div
              style={{
                width: `${(activeView / views.length) * 100}%`
              }}
            />
          </div>
        )}

        <Row style={{ marginTop: 40, marginBottom: 40 }}>
          <Column all={{ size: 6, offset: 3 }}>{views[activeView]}</Column>
        </Row>
      </Container>
      {activeView !== -1 && activeView < views?.length && (
        <Container style={{ position: "sticky", bottom: -2, zIndex: 2 }}>
          <Row>
            <Column all={{ size: 6, offset: 3 }}>
              <Card style={{ padding: 10 }}>
                <Flex mainAxisAlignment="between" crossAxisAlignment="center">
                  <Text variant="subtitleSmall" color="textSecondary">
                    {`صفحهٔ ${(activeView + 1).toLocaleString("fa-ir", {
                      useGrouping: false
                    })} از ${views.length.toLocaleString("fa-ir", {
                      useGrouping: false
                    })}`}
                  </Text>
                  <div>
                    {
                      <Flex
                        mainAxisAlignment="end"
                        style={{ gap: 10 }}
                        variant="block"
                      >
                        <Button
                          disabled={activeView === 0}
                          color="secondary"
                          variant="outlined"
                          onClick={handlePrev}
                          label="قبلی"
                        />
                        <Button
                          color="primary"
                          onClick={handleNext}
                          label={
                            activeView < viewsProp.length - 1 &&
                            activeView !== -1
                              ? "بعدی"
                              : "ارسال"
                          }
                        />
                      </Flex>
                    }
                  </div>
                </Flex>
              </Card>
            </Column>
          </Row>
        </Container>
      )}
    </div>
  );
};

const Form = React.forwardRef(FormBase) as typeof FormBase;

export default Form;
