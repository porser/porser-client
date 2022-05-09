import setRef from "@sonnat/ui/utils/setRef";
import * as React from "react";
import { isFragment } from "react-is";

interface WithContentEditableBaseProps {
  className?: string;
  children: React.ReactNode;
  defaultContent?: string;
  onContentChange?: (content: string) => void;
}

type WithContentEditableProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof WithContentEditableBaseProps
> &
  WithContentEditableBaseProps;

const WithContentEditable = (props: WithContentEditableProps) => {
  const {
    onContentChange,
    defaultContent: defaultContentProp,
    children: childrenProp
  } = props;

  const { current: defaultContent } = React.useRef(defaultContentProp);

  const elementRef = React.useRef<HTMLElement | null>(null);

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) return null;
    if (isFragment(child)) return null;

    return child as React.ReactElement;
  });

  if (!children) return null;

  if (children.length > 1) {
    if (process.env.NODE_ENV !== "production")
      // eslint-disable-next-line no-console
      console.error("Error: Can't have more than one child.");
    return <>{children}</>;
  }

  const handleChange = () => {
    const element = elementRef.current;
    if (!element) return;

    onContentChange?.(element.innerText);
  };

  const element = React.cloneElement(children[0], {
    ref: (node: HTMLElement | null) => {
      const childRef = (
        children[0] as unknown as { ref?: React.Ref<HTMLElement> }
      ).ref;

      elementRef.current = node;

      if (childRef) setRef(childRef, node);
      if (node && defaultContent) node.innerText = defaultContent;
    },
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: handleChange,
    onBlur: handleChange,
    onKeyUp: handleChange
  });

  return <>{element}</>;
};

export default WithContentEditable;
