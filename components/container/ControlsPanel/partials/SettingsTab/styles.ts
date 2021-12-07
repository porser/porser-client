import makeStyles from "@sonnat/ui/styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {},
      segment: {},
      formControl: { "& + &": { marginTop: pxToRem(32) } },
      formControlLabel: { ...variants.subtitleSmall }
    };
  },
  { name: "SettingsTab" }
);

export default useStyles;
