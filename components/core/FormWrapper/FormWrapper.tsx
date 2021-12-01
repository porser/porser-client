import c from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import ViewWrapper, { Action as ViewAction } from "../ViewWrapper";
import useStyles from "./styles";

interface FormWrapperBaseProps {
  className?: string;
  views: React.ReactNode;
  id: string;
  title: string;
  description?: string;
}

type FormWrapperProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FormWrapperBaseProps
> &
  FormWrapperBaseProps;

const FormWrapperBase = (
  props: FormWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    className,
    id,
    title,
    description,
    views: viewsProp,
    ...otherProps
  } = props;

  const classes = useStyles();

  // const handleSubmit = () => {
  //   viewActionRefs.current.forEach(x => {
  //     console.log(x, (x as React.RefObject<ViewAction>).current?.getStates());
  //   });
  // };

  const viewActionRefs = React.useRef<React.Ref<ViewAction>[]>([]);

  let index = 0;
  const views = React.Children.map(viewsProp, view => {
    if (!React.isValidElement(view)) return null;
    if (isFragment(view)) return null;
    if ((view as React.ReactElement).type !== ViewWrapper) return null;

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
      data-description={description}
      ref={ref}
      className={c(className, classes.root)}
      {...otherProps}
    >
      {views}
    </div>
  );
};

const FormWrapper = React.forwardRef(FormWrapperBase) as typeof FormWrapperBase;

export default FormWrapper;
