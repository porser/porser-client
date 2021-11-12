import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return { root: {} };
  },
  { name: "SignupForm" }
);

export default useStyles;
