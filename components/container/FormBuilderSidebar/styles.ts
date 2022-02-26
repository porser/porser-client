import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ colors: { divider }, spacings: { spacer }, typography: { pxToRem } }) => ({
    root: {},
    heading: {
      paddingRight: pxToRem(spacer.px * 0.75),
      paddingLeft: spacer.rem,
      height: pxToRem(48)
    },
    body: {
      height: `calc(100% - ${pxToRem(128)})`,
      overflow: "auto",
      borderTop: `1px solid ${divider.dark}`
    },
    staticRow: { borderTop: `1px solid ${divider.dark}` }
  }),
  { name: "FormBuilderSidebar" }
);

export default useStyles;
