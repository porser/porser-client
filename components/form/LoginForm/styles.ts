import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return { root: {} };
  },
  { name: "LoginForm" }
);

export default useStyles;
