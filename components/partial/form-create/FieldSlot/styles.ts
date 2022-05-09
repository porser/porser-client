import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ spacings: { spaces, spacer }, typography: { pxToRem } }) => ({
    root: {
      position: "relative",
      "&:not($singly)": {
        paddingTop: pxToRem(spacer.px * 2),
        paddingBottom: pxToRem(spacer.px * 2)
      },
      "&:hover": { "& $fieldActions": { opacity: 1, visibility: "visible" } }
    },
    field: {
      marginTop: spaces[3].rem,
      pointerEvents: "none",
      "&[data-type='NUMBER']": { maxWidth: pxToRem(288) },
      "&[data-type='CHOICE']": {
        "& .option": {},
        "& .option__description": {
          paddingRight: pxToRem(spacer.px * 2.25),
          marginBottom: pxToRem(spacer.px * 0.5)
        }
      }
    },
    fieldPreview: {},
    fieldActions: {
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 240ms ease, visibility 240ms ease"
    },
    singly: {},
    label: { marginBottom: spaces[3].rem, cursor: "initial" },
    description: { marginBottom: spaces[3].rem }
  }),
  { name: "FieldSlot" }
);

export default useStyles;
