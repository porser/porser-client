import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {},
      main: {},
      controlsPanel: {},
      formResult: {},
      meta: {
        display: "flex",
        alignItems: "center",
        paddingTop: pxToRem(32),
        paddingBottom: pxToRem(32)
      },
      title: { ...variants.h6 },
      actions: {
        display: "flex",
        alignItems: "center",
        marginRight: "auto"
      },
      divider: {
        marginRight: pxToRem(20),
        marginTop: pxToRem(8),
        marginBottom: pxToRem(8)
      },
      saveFormBtn: { marginRight: pxToRem(32) }
    };
  },
  { name: "FormBuilderLayout" }
);

export default useStyles;
