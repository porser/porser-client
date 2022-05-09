import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ typography: { pxToRem } }) => ({
    root: { display: "flex" },
    main: { flex: "1 1 auto" },
    sidebar: {
      width: pxToRem(320),
      position: "sticky",
      top: pxToRem(112),
      height: `calc(100vh - ${pxToRem(112)})`,
      boxShadow: "-1px 0px 2px rgba(0, 0, 0, 0.12)"
    }
  }),
  { name: "FormBuilderLayout" }
);

export default useStyles;
