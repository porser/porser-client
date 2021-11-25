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

  const handleSubmit = () => {
    viewActionRefs.current.forEach(x => {
      console.log(x, (x as React.RefObject<ViewAction>).current?.getStates());
    });

    if (onSubmit) onSubmit();
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
      {views}
    </div>
  );
};

const Form = React.forwardRef(FormBase) as typeof FormBase;

export default Form;
