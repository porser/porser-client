import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {},
      progress: {
        position: "fixed",
        top: 0,
        height: 4,
        inset: "0 0 auto 0",
        "&>div": {
          height: "100%",
          transition: "width 0.2s ease-in",
          background: theme.colors.primary.dark
        }
      }
    };
  },
  { name: "FormWrapper" }
);

export default useStyles;
