import { Button, Column, Container, Row, Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import { convertNumber } from "utils";
import ViewWrapper, { ViewWrapperBaseProps } from "../ViewWrapper";
import type { IFormContext } from "./Context";
import Provider from "./Provider";
import useStyles from "./styles";

interface FormWrapperBaseProps {
  className?: string;
  views: React.ReactNode;
  id: string;
}

type FormWrapperProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormWrapperBaseProps
> &
  FormWrapperBaseProps;

type FieldState = { value: unknown; isValid: boolean; otherValue?: string };
type ViewState = Record<string, FieldState>;

type State = { views: Record<string, ViewState> };

type Action =
  | {
      type: "SET_FIELD_VALUE";
      viewId: string;
      data: Omit<FieldState, "isValid"> & { fieldId: string };
    }
  | {
      type: "SET_FIELD_VALIDITY";
      viewId: string;
      data: {
        fieldId: string;
        isValid: boolean;
      };
    }
  | {
      type: "INITIALIZE_FIELD";
      viewId: string;
      data: FieldState & { fieldId: string };
    };

type Reducer = (prevState: State, action: Action) => State;

const INITIAL_STATE: State = { views: {} };

const reducer: Reducer = (prevState, action) => {
  switch (action.type) {
    case "INITIALIZE_FIELD": {
      const { data, viewId } = action;
      const prevView = prevState.views[viewId];

      return {
        views: {
          ...prevState.views,
          [viewId]: {
            ...(prevView || {}),
            [data.fieldId]: {
              value: data.value,
              isValid: data.isValid,
              otherValue: data.otherValue
            }
          }
        }
      };
    }
    case "SET_FIELD_VALIDITY": {
      const { data, viewId } = action;
      const prevView = prevState.views[viewId];

      return {
        views: {
          ...prevState.views,
          [viewId]: {
            ...prevView,
            [data.fieldId]: { ...prevView[data.fieldId], isValid: data.isValid }
          }
        }
      };
    }
    case "SET_FIELD_VALUE": {
      const { data, viewId } = action;
      const prevView = prevState.views[viewId];

      return {
        views: {
          ...prevState.views,
          [viewId]: {
            ...prevView,
            [data.fieldId]: {
              ...prevView[data.fieldId],
              value: data.value,
              otherValue: data.otherValue
            }
          }
        }
      };
    }
    default:
      return prevState;
  }
};

const FormWrapperBase = (
  props: FormWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, id, views: viewsProp, ...otherProps } = props;

  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const classes = useStyles();

  const [activeView, setActiveView] = React.useState(-1);

  const mapIndexToId = new Map<number, string>();

  let viewCount = -2;
  const views = React.Children.map(viewsProp, child => {
    if (!React.isValidElement(child)) return null;
    if (isFragment(child)) return null;
    if ((child as React.ReactElement).type !== ViewWrapper) return null;

    const view = child as React.ReactElement<ViewWrapperBaseProps>;

    if (!view.props.isFinalView && !view.props.isInitialView)
      mapIndexToId.set(view.props.index - 1, view.props.id);

    viewCount++;

    if (view.props.index - 1 !== activeView) return null;

    return React.cloneElement(view, { ...view.props });
  });

  const handleNext = () => {
    setActiveView(v => (v + 1 >= viewCount ? viewCount : v + 1));
  };

  const handlePrevious = () => {
    setActiveView(v => (v - 1 <= 0 ? 0 : v - 1));
  };

  const getViewState = (viewIndex: number) => {
    const viewId = mapIndexToId.get(viewIndex);
    return viewId ? state.views[viewId] : null;
  };

  const context = React.useMemo<IFormContext>(
    () => ({
      views: state.views,
      initializeField: (viewId, data) =>
        dispatch({ type: "INITIALIZE_FIELD", viewId, data }),
      setFieldValidity: (viewId, data) =>
        dispatch({ type: "SET_FIELD_VALIDITY", viewId, data }),
      setFieldValue: (viewId, data) =>
        dispatch({ type: "SET_FIELD_VALUE", viewId, data })
    }),
    [state]
  );

  const isFormDisabled = (() => {
    const viewState = getViewState(activeView);

    if (!viewState) return false;

    return Object.keys(viewState).some(fid => !viewState[fid].isValid);
  })();

  return (
    <div
      id={`form-${id}`}
      ref={ref}
      className={c(className, classes.root, {
        [classes.initialView]: activeView === -1
      })}
      {...otherProps}
    >
      <Container className={classes.container}>
        <Row>
          <Column sm={{ size: 8, offset: 2 }} xlg={{ size: 6, offset: 3 }}>
            <Provider context={context}>{views}</Provider>
          </Column>
        </Row>
      </Container>
      <footer className={classes.footer}>
        <Container className={classes.footerContainer}>
          {activeView !== -1 && (
            <div className={classes.viewProgression}>
              <div className={classes.viewProgressionHeading}>
                <span className={classes.viewProgressionDot}></span>
                <Text variant="caption">پیشرفت</Text>
                <Text
                  variant="caption"
                  className={classes.viewProgressionSteps}
                >
                  {`${convertNumber(activeView, "fa-ir")} / ${convertNumber(
                    viewCount,
                    "fa-ir"
                  )}`}
                </Text>
              </div>
              <div className={classes.viewProgressionBar}>
                <div
                  style={{ width: `${(activeView / viewCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className={classes.viewControls}>
            {activeView > 0 && (
              <Button
                label="قبلی"
                size="large"
                variant="outlined"
                onClick={() => void handlePrevious()}
              />
            )}
            <Button
              label={
                activeView === -1
                  ? "شروع"
                  : activeView === viewCount
                  ? "ارسال"
                  : "بعدی"
              }
              size="large"
              variant="filled"
              color="primary"
              className={classes.primaryButton}
              key={`${String(isFormDisabled)}`}
              disabled={isFormDisabled}
              onClick={() => void handleNext()}
            />
          </div>
        </Container>
      </footer>
    </div>
  );
};

const FormWrapper = React.forwardRef(FormWrapperBase) as typeof FormWrapperBase;

export default FormWrapper;
