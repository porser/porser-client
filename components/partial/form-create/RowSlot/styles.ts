import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ colors, spacings: { spacer }, typography: { pxToRem } }) => ({
    root: {
      position: "relative",
      paddingTop: pxToRem(spacer.px * 4),
      paddingBottom: pxToRem(spacer.px * 4),
      "& + &": { borderTop: `1px solid ${colors.divider.dark}` }
    },
    container: { position: "relative" }
  }),
  { name: "RowSlot" }
);

export default useStyles;
