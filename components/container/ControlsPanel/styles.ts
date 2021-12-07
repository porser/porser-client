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
        borderRadius: pxToRem(8)
      },
      tabs: { boxShadow: `0 1px 0 0 ${colors.divider}` },
      container: {
        paddingRight: pxToRem(16),
        paddingLeft: pxToRem(16),
        paddingBottom: pxToRem(16),
        paddingTop: pxToRem(16),
        overflow: "auto"
      },
      actionBar: {
        position: "sticky",
        borderRadius: `0 0 ${pxToRem(8)} ${pxToRem(8)}`,
        zIndex: 2,
        bottom: 0,
        padding: pxToRem(16),
        boxShadow: `0 -1px 2px ${colors.divider}`,
        backgroundColor: "rgba(255, 255, 255, 0.98)"
      },
      primaryActionBtn: { width: "100%" }
    };
  },
  { name: "ControlsPanel" }
);

export default useStyles;
