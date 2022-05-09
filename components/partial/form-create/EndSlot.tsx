import { Tag, Text } from "@sonnat/ui";
import * as React from "react";
import EditableContent from "./EditableContent";
import RowSlot from "./RowSlot";
import type { RowSlotProps } from "./RowSlot/RowSlot";
import { useStyles } from "./StartSlot";

const EndSlot = (props: RowSlotProps) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState("خدا نگه‌دار!");
  const [description, setDescription] = React.useState("");

  return (
    <RowSlot {...props}>
      <Tag label="صفحه پایانی" color="info" className={classes.tag} />
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
        initialContent={description}
        placeholder="متن توضیحات را وارد کنید"
        onContentChange={content => void setDescription(content)}
      />
    </RowSlot>
  );
};

export default EndSlot;
