import { ChevronDown, ChevronUp, PencilO, TrashCanO } from "@sonnat/icons";
import { Button, Text } from "@sonnat/ui";
import c from "classnames";
import * as React from "react";
import useStyles from "./styles";

interface EntityItemBaseProps {
  className?: string;
  moveUpLabel?: string;
  moveDownLabel?: string;
  editLabel?: string;
  removeLabel?: string;
  shouldDisableMoveUp?: boolean;
  shouldDisableMoveDown?: boolean;
  title: string;
  subtitle: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

type EntityItemProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof EntityItemBaseProps
> &
  EntityItemBaseProps;

const EntityItemBase = (
  props: EntityItemProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    className,
    onMoveDown,
    onMoveUp,
    onRemove,
    onEdit,
    title,
    subtitle,
    shouldDisableMoveDown = false,
    shouldDisableMoveUp = false,
    editLabel = "ویرایش",
    removeLabel = "حذف",
    moveUpLabel = "انتقال به بالا",
    moveDownLabel = "انتقال به پایین",
    ...otherProps
  } = props;

  const classes = useStyles();

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div className={classes.moveBox}>
        <Button
          aria-label={moveUpLabel}
          leadingIcon={<ChevronUp />}
          disabled={shouldDisableMoveUp}
          size="small"
          variant="inlined"
          onClick={() => void onMoveUp()}
        />
        <Button
          aria-label={moveDownLabel}
          leadingIcon={<ChevronDown />}
          disabled={shouldDisableMoveDown}
          size="small"
          variant="inlined"
          onClick={() => void onMoveDown()}
        />
      </div>
      <div className={classes.info}>
        <Text
          variant="caption"
          weight="medium"
          rootNode="strong"
          className={classes.title}
        >
          {title}
        </Text>
        <Text
          variant="captionSmall"
          rootNode="small"
          className={classes.subtitle}
        >
          {subtitle}
        </Text>
      </div>
      <div className={classes.actions}>
        <Button
          aria-label={editLabel}
          leadingIcon={<PencilO />}
          size="small"
          variant="inlined"
          onClick={() => void onEdit()}
        />
        <Button
          aria-label={removeLabel}
          leadingIcon={<TrashCanO />}
          size="small"
          variant="inlined"
          onClick={() => void onRemove()}
        />
      </div>
    </div>
  );
};

const EntityItem = React.forwardRef(EntityItemBase) as typeof EntityItemBase;

export default EntityItem;
