import {
  ChevronDown,
  ChevronUp,
  CogO,
  ContentCopyO,
  TrashCanO
} from "@sonnat/icons";
import { Column, Flex, IconButton, Row, Text, Tooltip } from "@sonnat/ui";
import useHover from "@utilityjs/use-hover";
import c from "classnames";
import { type Field } from "modules/form/FormSerializer";
import getCorrespondingStatelessComponent from "modules/form/getCorrespondingStatelessComponent";
import * as React from "react";
import { createSlotId } from "utils";
import { EditableContent } from "..";
import useStyles from "./styles";

interface FieldSlotBaseProps {
  className?: string;
  title: Field["title"];
  description: Field["description"];
  type: Field["type"];
  props: Field["props"];
  id: Field["id"];
  disableDown: boolean;
  disableUp: boolean;
  singly: boolean;
  actions: {
    delete: () => void;
    duplicate: () => void;
    moveUp: () => void;
    moveDown: () => void;
    edit: () => void;
  };
}

type FieldSlotProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldSlotBaseProps
> &
  FieldSlotBaseProps;

const FieldSlot = (props: FieldSlotProps) => {
  const {
    title,
    description,
    type,
    id,
    disableDown,
    disableUp,
    props: fieldProps,
    singly,
    className,
    actions,
    ...otherProps
  } = props;

  const classes = useStyles();

  const [isTitleEmpty, setIsTitleEmpty] = React.useState(false);

  const upHover = useHover();
  const downHover = useHover();

  return (
    <Row
      id={createSlotId("field", id)}
      className={c(className, classes.root, { [classes.singly]: singly })}
      {...otherProps}
    >
      <Column all={8}>
        <Flex direction="column" className={classes.fieldPreview}>
          <label className={c(classes.label)}>
            <EditableContent
              onContentChange={content =>
                void setIsTitleEmpty(content.length === 0)
              }
              variant="subtitle"
              initialContent={title}
              placeholder="عنوان سؤال"
            />
            {isTitleEmpty && (
              <Text variant="caption" color="error">
                عنوان سؤال نمی‌تواند خالی باشد!
              </Text>
            )}
          </label>
          <div className={classes.description}>
            <EditableContent
              variant="bodySmall"
              initialContent={description}
              placeholder="توضیحات سؤال را وارد کنید"
              color="textSecondary"
            />
          </div>
          {getCorrespondingStatelessComponent({
            id,
            type,
            props: fieldProps,
            className: classes.field
          })}
        </Flex>
      </Column>
      <Column all={4}>
        <Flex mainAxisAlignment="end" className={classes.fieldActions}>
          <Flex direction="column">
            <Tooltip text="تنظیمات سؤال" placement="right">
              <IconButton
                icon={<CogO />}
                variant="inlined"
                onClick={actions.edit}
              />
            </Tooltip>
            <Tooltip text="تکثیر سؤال" placement="right">
              <IconButton
                icon={<ContentCopyO />}
                variant="inlined"
                onClick={actions.duplicate}
              />
            </Tooltip>
            <Tooltip text="حذف سؤال" placement="right">
              <IconButton
                icon={<TrashCanO />}
                variant="inlined"
                onClick={actions.delete}
              />
            </Tooltip>
          </Flex>
          <Flex direction="column">
            <Tooltip
              open={upHover.isHovered}
              text="انتقال سؤال به بالا"
              placement="top"
            >
              <IconButton
                ref={upHover.registerRef}
                disabled={disableUp}
                icon={<ChevronUp />}
                variant="inlined"
                onClick={() =>
                  void (actions.moveUp(), upHover.setIsHovered(false))
                }
              />
            </Tooltip>
            <Tooltip
              open={downHover.isHovered}
              text="انتقال سؤال به پایین"
              placement="bottom"
            >
              <IconButton
                ref={downHover.registerRef}
                disabled={disableDown}
                icon={<ChevronDown />}
                variant="inlined"
                onClick={() =>
                  void (actions.moveDown(), downHover.setIsHovered(false))
                }
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Column>
    </Row>
  );
};

export default FieldSlot;
