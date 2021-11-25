import useStyles from "../LoginForm/styles";

export default useStyles;

// import makeStyles from "@sonnat/ui/styles/makeStyles";

// const useStyles = makeStyles(
//   theme => {
//     const {
//       colors,
//       typography: { pxToRem, variants }
//     } = theme;

//     return {
//       root: {
//         display: "flex",
//         flexDirection: "column",
//         flex: "1 1",
//         padding: pxToRem(64),
//         backgroundColor: "rgba(255, 255, 255, 0.7)",
//         borderRadius: pxToRem(32),
//         backdropFilter: "blur(60px)"
//       },
//       formError: {
//         ...variants.bodySmall,
//         padding: `${pxToRem(8)} ${pxToRem(12)} ${pxToRem(8)} ${pxToRem(8)}`,
//         borderRadius: `${pxToRem(4)} 0 0 ${pxToRem(4)}`,
//         borderRight: `4px solid ${colors.pallete.red[900]}`,
//         color: colors.pallete.red[900],
//         whiteSpace: "pre-wrap",
//         backgroundColor: colors.pallete.pink[50],
//         marginBottom: pxToRem(16)
//       },
//       title: { marginBottom: pxToRem(8) },
//       formControl: { marginTop: pxToRem(16) },
//       submitBtn: { marginTop: pxToRem(32) },
//       footer: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: pxToRem(8),
//         "& > a": {
//           color: colors.pallete.lightBlue[500],
//           transition: "color 240ms ease",
//           "&:hover": { color: colors.pallete.lightBlue[900] }
//         },
//         "& > span + a": { marginRight: pxToRem(8) }
//       }
//     };
//   },
//   { name: "SignupForm" }
// );

// export default useStyles;
