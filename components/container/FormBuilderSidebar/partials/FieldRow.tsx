import {
  ContentCopyO,
  DotsVertical,
  FormatText,
  TrashCanO
} from "@sonnat/icons";
import { Checkbox, Flex, IconButton, Menu, MenuItem, Text } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import useControlledProp from "@utilityjs/use-controlled-prop";
import c from "classnames";
import type { Field } from "context/FormBuilderContext";
import * as React from "react";

interface FieldRowBaseProps {
  className?: string;
  selected?: boolean;
  selectable?: boolean;
  onSelect?: (isSelected: boolean) => void;
  data: Field;
  actions: {
    duplicate: () => void;
    delete: () => void;
  };
}

type FieldRowProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldRowBaseProps
> &
  FieldRowBaseProps;

const useStyles = makeStyles(
  ({
    spacings: { spacer },
    typography: { pxToRem },
    mixins: { disableUserSelect }
  }) => ({
    root: {
      position: "relative",
      width: "100%",
      height: pxToRem(40),
      paddingRight: spacer.rem,
      paddingLeft: spacer.rem,
      cursor: "pointer",
      transition: "background-color 240ms ease",
      "&:hover": {
        "&$selectable:not($selected) > $icon": {
          visibility: "hidden",
          opacity: 0
        },
        "&$selectable:not($selected) > $checkbox": {
          visibility: "visible",
          opacity: 1
        },
        "& > $actionsBtn": { visibility: "visible", opacity: 1 }
      }
    },
    checkbox: {
      position: "absolute",
      right: pxToRem(spacer.px * 0.75),
      visibility: "hidden",
      opacity: 0,
      transition: ["visibility 240ms ease", "opacity 240ms ease"].join(", ")
    },
    title: { ...disableUserSelect(), marginLeft: pxToRem(spacer.px * 0.5) },
    icon: {
      marginLeft: pxToRem(spacer.px * 0.5),
      visibility: "visible",
      opacity: 1,
      transition: ["visibility 240ms ease", "opacity 240ms ease"].join(", ")
    },
    actionsBtn: {
      marginRight: "auto",
      visibility: "hidden",
      opacity: 0,
      transition: ["visibility 240ms ease", "opacity 240ms ease"].join(", ")
    },
    menuItem: { "& > span": { marginRight: pxToRem(spacer.px * 0.5) } },
    selected: {
      "& > $checkbox": { visibility: "visible", opacity: 1 },
      "& > $icon": { visibility: "hidden", opacity: 0 }
    },
    selectable: {},
    menuOpened: { "& > $actionsBtn": { visibility: "visible", opacity: 1 } }
  }),
  { name: "FieldRow" }
);

const FieldRowBase = (props: FieldRowProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    actions,
    selected,
    onSelect,
    className,
    data,
    selectable = false,
    ...otherProps
  } = props;

  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [isSelected, setIsSelected] = useControlledProp(selected, false, false);

  const menuAnchorRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Flex
      crossAxisAlignment="center"
      role="button"
      tabIndex={-1}
      ref={ref}
      className={c(className, classes.root, {
        [classes.selected]: selected,
        [classes.selectable]: selectable,
        [classes.menuOpened]: isMenuOpen
      })}
      {...otherProps}
    >
      <Checkbox
        className={classes.checkbox}
        inputProps={{ "aria-label": "انتخاب سؤال" }}
        size="small"
        checked={isSelected}
        onChange={checked => {
          onSelect?.(checked);
          setIsSelected(checked);
        }}
      />
      <FormatText className={classes.icon} size={20} color="primary" />
      <Text
        noWrap
        textOverflow="ellipsis"
        variant="bodySmall"
        className={classes.title}
        color="textSecondary"
      >
        {data.title}
      </Text>
      <IconButton
        ref={menuAnchorRef}
        aria-label="عملیات"
        className={classes.actionsBtn}
        icon={<DotsVertical />}
        size="small"
        variant="inlined"
        onClick={() => void setIsMenuOpen(o => !o)}
      />
      <Menu
        open={isMenuOpen}
        minWidth={120}
        anchorNode={menuAnchorRef.current}
        onOutsideClick={() => void setIsMenuOpen(false)}
      >
        <MenuItem
          onClick={() => void (actions.duplicate(), setIsMenuOpen(false))}
          className={classes.menuItem}
        >
          <ContentCopyO size={16} />
          <span>تکثیر سؤال</span>
        </MenuItem>
        <MenuItem
          onClick={() => void (actions.delete(), setIsMenuOpen(false))}
          className={classes.menuItem}
        >
          <TrashCanO size={16} />
          <span>حذف سؤال</span>
        </MenuItem>
      </Menu>
    </Flex>
  );
};

const FieldRow = React.forwardRef(FieldRowBase) as typeof FieldRowBase;

export default FieldRow;
