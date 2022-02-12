import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return {
      root: {},
      option: {},
      optionDescription: {
        paddingRight: pxToRem(36),
        marginBottom: pxToRem(8)
      },
      otherwise: {
        border: `1px dashed ${colors.divider.dark}`,
        padding: pxToRem(16),
        paddingTop: pxToRem(8),
        borderRadius: pxToRem(4)
      }
    };
  },
  { name: "Choice" }
);

export default useStyles;
