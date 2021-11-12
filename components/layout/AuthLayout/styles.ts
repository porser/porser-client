import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return { root: {}, main: {} };
  },
  { name: "AuthLayout" }
);

export default useStyles;
