import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      },
      form: {
        display: "flex",
        flexDirection: "column",
        flex: "1 1",
        padding: pxToRem(64),
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        borderRadius: pxToRem(32),
        boxShadow: "0 15px 40px 0 rgba(0, 0, 0, 0.08)",
        "&.success": { textAlign: "center" }
      },
      formSuccess: {
        ...variants.bodySmall,
        padding: `${pxToRem(8)} ${pxToRem(12)} ${pxToRem(8)} ${pxToRem(8)}`,
        borderRadius: `${pxToRem(4)} 0 0 ${pxToRem(4)}`,
        borderRight: `4px solid ${colors.pallete.green[900]}`,
        color: colors.pallete.green[900],
        whiteSpace: "pre-wrap",
        backgroundColor: colors.pallete.lightGreen[50],
        marginBottom: pxToRem(16)
      },
      formError: {
        ...variants.bodySmall,
        padding: `${pxToRem(8)} ${pxToRem(12)} ${pxToRem(8)} ${pxToRem(8)}`,
        borderRadius: `${pxToRem(4)} 0 0 ${pxToRem(4)}`,
        borderRight: `4px solid ${colors.pallete.red[900]}`,
        color: colors.pallete.red[900],
        whiteSpace: "pre-wrap",
        backgroundColor: colors.pallete.pink[50],
        marginBottom: pxToRem(16)
      },
      title: { marginBottom: pxToRem(8) },
      formControl: { marginTop: pxToRem(16) },
      submitBtn: { marginTop: pxToRem(32) },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: pxToRem(8),
        "& > a": {
          color: colors.pallete.lightBlue[500],
          transition: "color 240ms ease",
          "&:hover": { color: colors.pallete.lightBlue[900] }
        },
        "& > span + a": { marginRight: pxToRem(8) }
      },
      copyright: {
        mixBlendMode: "multiply",
        direction: "ltr",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        alignSelf: "center",
        bottom: pxToRem(-64)
      },
      logo: { height: pxToRem(18) },
      copyrightDivider: {
        width: 1,
        backgroundColor: colors.divider,
        height: pxToRem(24),
        marginRight: pxToRem(8),
        marginLeft: pxToRem(8)
      },
      copyrightText: { direction: "ltr", lineHeight: pxToRem(16) }
    };
  },
  { name: "LoginForm" }
);

export default useStyles;
