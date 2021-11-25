import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        backgroundImage: 'url("/static/media/auth-bg.svg")',
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat"
      }
    };
  },
  { name: "AuthLayout" }
);

export default useStyles;
