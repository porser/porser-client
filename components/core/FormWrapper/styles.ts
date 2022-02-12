import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      zIndexes,
      breakpoints,
      typography: { pxToRem }
    } = theme;

    return {
      root: {},
      container: {},
      footer: {
        position: "sticky",
        zIndex: zIndexes.header,
        bottom: 0,
        backgroundColor: "rgba(255 ,255, 255, 0.98)",
        boxShadow: "0px -1px 2px rgba(0, 0, 0, 0.12);"
      },
      initialView: {},
      footerContainer: {
        display: "flex",
        alignItems: "center",
        height: pxToRem(64),
        [breakpoints.down("sm")]: {
          height: "auto",
          paddingTop: pxToRem(16),
          paddingBottom: pxToRem(16),
          flexDirection: "column",
          alignItems: "stretch"
        }
      },
      viewControls: {
        display: "flex",
        marginRight: "auto",
        [breakpoints.down("sm")]: {
          marginRight: 0,
          flexGrow: 1,
          "& > *": { flexGrow: 1 }
        },
        "& > * + *": { marginRight: pxToRem(8) }
      },
      viewProgression: {
        display: "flex",
        flexDirection: "column",
        [breakpoints.down("sm")]: { marginBottom: pxToRem(16) }
      },
      viewProgressionHeading: {
        display: "flex",
        alignItems: "center"
      },
      viewProgressionDot: {
        width: pxToRem(4),
        height: pxToRem(4),
        borderRadius: "50%",
        backgroundColor: colors.primary.origin,
        marginLeft: pxToRem(8)
      },
      viewProgressionSteps: { marginRight: "auto", direction: "ltr" },
      viewProgressionBar: {
        position: "relative",
        paddingLeft: pxToRem(2),
        paddingRight: pxToRem(2),
        width: pxToRem(160),
        marginTop: pxToRem(4),
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        height: pxToRem(8),
        backgroundColor: colors.divider.dark,
        borderRadius: pxToRem(8),
        [breakpoints.down("sm")]: { width: "100%" },
        "& > div": {
          height: pxToRem(4),
          borderRadius: pxToRem(2),
          transition: "width 240ms ease",
          backgroundColor: colors.primary.origin
        }
      },
      primaryButton: {}
    };
  },
  { name: "FormWrapper" }
);

export default useStyles;
