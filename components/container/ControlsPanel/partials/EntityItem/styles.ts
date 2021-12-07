import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        display: "flex",
        alignItems: "center",
        padding: pxToRem(8),
        border: `1px solid ${colors.divider}`,
        borderRadius: pxToRem(4),
        "& + &": { marginTop: pxToRem(8) }
      },
      moveBox: {
        display: "flex",
        flexDirection: "column",
        marginLeft: pxToRem(8)
      },
      info: { display: "flex", flexDirection: "column" },
      title: {},
      subtitle: { marginTop: pxToRem(4) },
      actions: {
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        "& > * + *": { marginRight: pxToRem(8) }
      }
    };
  },
  { name: "EntityItem" }
);

export default useStyles;
