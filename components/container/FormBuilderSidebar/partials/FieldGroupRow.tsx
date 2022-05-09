import {
  FormatListGroup,
  ContentCopyO,
  PencilO,
  BurgerMenu,
  DotsVertical,
  TrashCanO
} from "@sonnat/icons";
import { Flex, Text, IconButton, Menu, MenuItem } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import c from "classnames";
import * as React from "react";
import { createSlotId } from "utils";

const useStyles = makeStyles(
  ({ colors: { divider }, spacings: { spacer }, typography: { pxToRem } }) => ({
    root: { "& + &": { borderTop: `1px solid ${divider.dark}` } },
    singly: {
      paddingRight: 0,
      paddingLeft: 0,
      "& $fields": { paddingRight: 0 },
      "& $heading": { display: "none" },
      "& $icon": { display: "none" }
    },
    heading: {
      height: pxToRem(40),
      paddingRight: spacer.rem,
      paddingLeft: spacer.rem,
      cursor: "default",
      "&:hover > $actionsBtn": {
        visibility: "visible",
        opacity: 1
      }
    },
    icon: { marginLeft: pxToRem(spacer.px * 0.5) },
    title: {},
    fields: { paddingRight: pxToRem(spacer.px * 1.25) },
    actionsBtn: {
      marginRight: "auto",
      visibility: "hidden",
      opacity: 0,
      transition: ["visibility 240ms ease", "opacity 240ms ease"].join(", ")
    },
    menuItem: { "& > span": { marginRight: pxToRem(spacer.px * 0.5) } },
    menuOpened: {
      "& > $heading > $actionsBtn": { visibility: "visible", opacity: 1 }
    },
    empty: { "& + $root": { borderTop: "none" } }
  }),
  { name: "FieldGroupRow" }
);

interface FieldGroupRowBaseProps {
  className?: string;
  singly?: boolean;
  id: string;
  title?: string;
  empty?: boolean;
  children: React.ReactNode;
  actions: {
    duplicate: () => void;
    delete: () => void;
    edit: () => void;
    ungroup: () => void;
  };
}

type FieldGroupRowProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof FieldGroupRowBaseProps
> &
  FieldGroupRowBaseProps;

const FieldGroupRowBase = (
  props: FieldGroupRowProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const {
    className,
    children,
    actions,
    title,
    id,
    singly = false,
    empty = false,
    ...otherProps
  } = props;

  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuAnchorRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div
      id={createSlotId(singly ? "singly" : "group", id)}
      ref={ref}
      className={c(className, classes.root, {
        [classes.singly]: singly,
        [classes.menuOpened]: isMenuOpen,
        [classes.empty]: empty
      })}
      {...otherProps}
    >
      <Flex className={classes.heading} crossAxisAlignment="center">
        <FormatListGroup
          className={classes.icon}
          size={20}
          color="textSecondary"
        />
        <Text
          className={classes.title}
          variant="subtitleSmall"
          color="textSecondary"
        >
          {title}
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
          anchorNodeReference={menuAnchorRef}
          onOutsideClick={() => void setIsMenuOpen(false)}
        >
          <MenuItem
            onClick={() => void (actions.ungroup(), setIsMenuOpen(false))}
            className={classes.menuItem}
          >
            <BurgerMenu size={16} />
            <span>تجزیه گروه</span>
          </MenuItem>
          <MenuItem
            onClick={() => void (actions.edit(), setIsMenuOpen(false))}
            className={classes.menuItem}
          >
            <PencilO size={16} />
            <span>ویرایش گروه</span>
          </MenuItem>
          <MenuItem
            onClick={() => void (actions.duplicate(), setIsMenuOpen(false))}
            className={classes.menuItem}
          >
            <ContentCopyO size={16} />
            <span>تکثیر گروه</span>
          </MenuItem>
          <MenuItem
            onClick={() => void (actions.delete(), setIsMenuOpen(false))}
            className={classes.menuItem}
          >
            <TrashCanO size={16} />
            <span>حذف گروه</span>
          </MenuItem>
        </Menu>
      </Flex>
      <div className={classes.fields}>{children}</div>
    </div>
  );
};

const FieldGroupRow = React.forwardRef(
  FieldGroupRowBase
) as typeof FieldGroupRowBase;

export default FieldGroupRow;
