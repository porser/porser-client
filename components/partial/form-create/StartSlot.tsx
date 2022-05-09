import { Tag, Text } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import * as React from "react";
import EditableContent from "./EditableContent";
import RowSlot from "./RowSlot";
import type { RowSlotProps } from "./RowSlot/RowSlot";

export const useStyles = makeStyles(
  ({ spacings: { spaces } }) => ({
    tag: { marginBottom: spaces[7].rem },
    title: { marginBottom: spaces[3].rem }
  }),
  { name: "Slot" }
);

const StartSlot = (props: RowSlotProps) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState("سلام، خوش‌آمدید!");
  const [description, setDescription] = React.useState("");

  return (
    <RowSlot {...props}>
      <Tag label="صفحه خوشامدگویی" color="info" className={classes.tag} />
      <EditableContent
        className={classes.title}
        variant="h5"
        initialContent={title}
        placeholder="عنوان را وارد کنید"
        onContentChange={content => void setTitle(content)}
      />
      {!title && (
        <Text variant="caption" color="error">
          {"عنوان نمی‌تواند خالی باشد!"}
        </Text>
      )}
      <EditableContent
        variant="body"
        placeholder="متن توضیحات را وارد کنید"
        initialContent={description}
        onContentChange={content => void setDescription(content)}
      />
    </RowSlot>
  );
};

export default StartSlot;
