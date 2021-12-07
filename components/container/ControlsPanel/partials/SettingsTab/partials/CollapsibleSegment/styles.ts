import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        paddingRight: pxToRem(16),
        paddingLeft: pxToRem(16),
        marginRight: pxToRem(-16),
        marginLeft: pxToRem(-16),
        marginTop: pxToRem(16),
        "& + *": {
          paddingTop: pxToRem(16),
          borderTop: `1px solid ${colors.divider}`
        }
      },
      title: {},
      trigger: { cursor: "pointer" },
      content: { paddingTop: pxToRem(16) },
      collapse: { transition: "height 240ms ease" }
    };
  },
  { name: "CollapsibleSegment" }
);

export default useStyles;
