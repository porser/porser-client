import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08);",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        paddingTop: pxToRem(16),
        borderRadius: pxToRem(8)
      },
      tabs: { boxShadow: `0 1px 0 0 ${colors.divider}` },
      container: {
        paddingRight: pxToRem(32),
        paddingLeft: pxToRem(32),
        paddingBottom: pxToRem(32)
      }
    };
  },
  { name: "ControlsPanel" }
);

export default useStyles;
