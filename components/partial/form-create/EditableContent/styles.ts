import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  ({ colors: { text } }) => ({
    root: { position: "relative" },
    content: {
      verticalAlign: "top",
      position: "relative",
      zIndex: 1,
      whiteSpace: "pre-wrap",
      "&:after": {
        content: '""',
        position: "absolute",
        right: 0,
        left: 0,
        bottom: -4,
        borderBottom: `2px dotted`,
        borderBottomColor: "transparent",
        transition: "border-color 240ms ease"
      },
      "&:hover:after": { borderColor: text.dark.hint }
    },
    emptyState: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 0,
      pointerEvents: "none"
    },
    empty: {}
  }),
  { name: "Content" }
);

export default useStyles;
