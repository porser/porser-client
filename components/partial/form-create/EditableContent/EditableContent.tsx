import { Text, type TextProps } from "@sonnat/ui";
import useLazyInitializedValue from "@utilityjs/use-lazy-initialized-value";
import c from "classnames";
import { WithContentEditable } from "components";
import * as React from "react";
import useStyles from "./styles";

interface EditableContentBaseProps {
  className?: string;
  initialContent?: string;
  placeholder?: string;
  variant: TextProps["variant"];
  color?: TextProps["color"];
  onContentChange?: (content: string) => void;
}

type EditableContentProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof EditableContentBaseProps
> &
  EditableContentBaseProps;

const EditableContent = (props: EditableContentProps) => {
  const {
    placeholder,
    className,
    initialContent: initialContentProp,
    onContentChange,
    variant,
    color,
    ...otherProps
  } = props;

  const classes = useStyles();

  const initialContent = useLazyInitializedValue(() => initialContentProp);

  const editableRef = React.useRef<HTMLSpanElement>(null);

  const [isEmpty, setIsEmpty] = React.useState(
    typeof initialContent === "undefined" ? true : initialContent.length === 0
  );

  const handleContentChange = (content: string) => {
    setIsEmpty(content.length === 0);
    onContentChange?.(content);
  };

  return (
    <div
      className={c(className, classes.root, { [classes.empty]: isEmpty })}
      {...otherProps}
    >
      <WithContentEditable onContentChange={handleContentChange}>
        <Text
          ref={editableRef}
          className={c(classes.content)}
          variant={variant}
          color={color}
          display="inline-block"
        >
          {initialContent}
        </Text>
      </WithContentEditable>
      {isEmpty && !!placeholder && (
        <Text
          ref={(node: HTMLSpanElement | null) => {
            if (node) {
              requestAnimationFrame(() => {
                if (editableRef.current)
                  editableRef.current.style.minWidth = `${node.offsetWidth}px`;
              });
            }
          }}
          className={c(classes.emptyState)}
          variant={variant}
          display="block"
          color="textHint"
        >
          {placeholder}
        </Text>
      )}
    </div>
  );
};

export default EditableContent;
