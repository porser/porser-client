import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      zIndexes,
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        position: "sticky",
        zIndex: zIndexes.header,
        top: 0,
        backgroundColor: "rgba(255 ,255, 255, 0.98)",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12);"
      },
      container: { display: "flex", alignItems: "center", height: pxToRem(64) },
      logo: { marginLeft: "auto", height: pxToRem(16) },
      logoutBtn: {},
      publicHeader: { "& $logo": { marginRight: "auto" } }
    };
  },
  { name: "DashboardHeader" }
);

export default useStyles;
