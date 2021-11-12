import makeStyles from "@sonnat/ui/styles/makeStyles";
import SignupForm from "components/form/SignupForm";
import AuthLayout from "components/layout/AuthLayout";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem }
    } = theme;

    return { root: {}, form: {} };
  },
  { name: "SignupPage" }
);

const SignupPage: NextPageWithLayout = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <SignupForm className={classes.form} />
    </section>
  );
};

const PageLayout: Layout = page => <AuthLayout>{page}</AuthLayout>;

SignupPage.getLayout = () => PageLayout;

export default SignupPage;
