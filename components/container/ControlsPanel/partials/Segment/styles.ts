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
        "& + *": {
          paddingTop: pxToRem(16),
          marginTop: pxToRem(16),
          borderTop: `1px solid ${colors.divider}`
        }
      },
      heading: {
        display: "flex",
        alignItems: "center",
        "& + $content": { paddingTop: pxToRem(16) },
        "& + $description": { paddingTop: pxToRem(8) }
      },
      headingActionBar: { marginRight: "auto" },
      title: {},
      description: {
        whiteSpace: "pre-wrap",
        "& + $content": { paddingTop: pxToRem(16) }
      },
      content: {}
    };
  },
  { name: "Segment" }
);

export default useStyles;
