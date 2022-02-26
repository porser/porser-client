import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      zIndexes,
      spacings: { spacer },
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        position: "sticky",
        zIndex: zIndexes.header,
        top: 0,
        backgroundColor: "rgba(255 ,255, 255, 0.98)",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12);",
        paddingTop: spacer.rem,
        paddingBottom: spacer.rem
      },
      main: { height: pxToRem(24) },
      logo: { marginLeft: "auto", height: pxToRem(16) },
      logoutBtn: {},
      publicHeader: { "& $logo": { marginRight: "auto" } },
      sub: { marginTop: spacer.rem }
    };
  },
  { name: "DashboardHeader" }
);

export default useStyles;
