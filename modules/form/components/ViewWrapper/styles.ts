import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      breakpoints,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: `calc(100vh - ${pxToRem(64 * 2)})`,
        paddingTop: pxToRem(32),
        paddingBottom: pxToRem(32),
        [breakpoints.down("sm")]: {
          "&$initialView": { minHeight: `calc(100vh - ${pxToRem(64 + 72)})` },
          minHeight: `calc(100vh - ${pxToRem(64 + 120)})`
        }
      },
      heading: { "& + *": { marginTop: pxToRem(32) } },
      description: { marginTop: pxToRem(8) },
      field: { "& + *": { marginTop: pxToRem(16) } },
      noDescription: {},
      finalView: { "&$noDescription": { alignItems: "center" } },
      initialView: { "&$noDescription": { alignItems: "center" } }
    };
  },
  { name: "ViewWrapper" }
);

export default useStyles;
