import makeStyles from "@sonnat/ui/styles/makeStyles";
import LoginForm from "components/form/LoginForm";
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
  { name: "LoginPage" }
);

const LoginPage: NextPageWithLayout = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <LoginForm className={classes.form} />
    </section>
  );
};

const PageLayout: Layout = page => <AuthLayout>{page}</AuthLayout>;

LoginPage.getLayout = () => PageLayout;

export default LoginPage;
