import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      spinner: { marginBottom: pxToRem(8) },
      text: {}
    };
  },
  { name: "PageSuspension" }
);

export default useStyles;
