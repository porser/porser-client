import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        minHeight: "calc(100vh - 52px)"
      }
    };
  },
  { name: "View" }
);

export default useStyles;
