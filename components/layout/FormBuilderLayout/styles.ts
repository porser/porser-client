import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ typography: { pxToRem } }) => ({
    root: { display: "flex" },
    main: { flex: "1 1 auto" },
    sidebar: {
      width: pxToRem(320),
      height: `calc(100vh - ${pxToRem(112)})`,
      boxShadow: "0 10px 20px 0 rgba(0, 0, 0, 0.08)"
    }
  }),
  {
    name: "FormBuilderLayout"
  }
);

export default useStyles;
