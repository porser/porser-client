import { DotsVertical, PinO } from "@sonnat/icons";
import { Flex, IconButton, Text } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import c from "classnames";
import * as React from "react";

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
      transition: "background-color 240ms ease"
    },
    icon: {
      marginLeft: pxToRem(spacer.px * 0.5),
      visibility: "visible",
      opacity: 1,
      transition: ["visibility 240ms ease", "opacity 240ms ease"].join(", ")
    },
    title: { ...disableUserSelect() },
    actionsBtn: { marginRight: "auto" }
  }),
  { name: "PageRow" }
);

interface PageRowBaseProps {
  className?: string;
  title: string;
}

type PageRowProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof PageRowBaseProps
> &
  PageRowBaseProps;

const PageRow = (props: PageRowProps) => {
  const { title, className, ...otherProps } = props;

  const classes = useStyles();

  return (
    <Flex
      crossAxisAlignment="center"
      role="button"
      tabIndex={-1}
      className={c(className, classes.root)}
      {...otherProps}
    >
      <PinO className={classes.icon} size={20} color="primary" />
      <Text
        noWrap
        textOverflow="ellipsis"
        variant="bodySmall"
        className={classes.title}
        color="textSecondary"
      >
        {title}
      </Text>
      <IconButton
        aria-label="عملیات"
        className={classes.actionsBtn}
        icon={<DotsVertical />}
        size="small"
        variant="inlined"
      />
    </Flex>
  );
};

export default PageRow;
