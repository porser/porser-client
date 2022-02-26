import makeStyles from "@sonnat/ui/styles/makeStyles";
import SignupForm from "components/form/SignupForm";
import AuthLayout from "components/layout/AuthLayout";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { PageLayout, PorserNextPage } from "types";
import {
  renderErrorPage,
  setTitleMeta,
  withServerSideAuthConfirmation
} from "utils";
import type { ErrorType } from "utils/useConfirmAuthentication";

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem }
    } = theme;

    return {
      root: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      form: { maxWidth: pxToRem(512) }
    };
  },
  { name: "Page" }
);

interface Props {
  preRenderErrors?: {
    globalError: ErrorType;
    connectionError: ErrorType;
  };
}

const Page: PorserNextPage<Props> = props => {
  const { preRenderErrors } = props;

  const classes = useStyles();

  if (preRenderErrors) return renderErrorPage(preRenderErrors);

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | ثبت‌نام")}</Head>
      <section className={classes.root}>
        <SignupForm className={classes.form} />
      </section>
    </React.Fragment>
  );
};

const Layout: PageLayout = page => <AuthLayout>{page}</AuthLayout>;

export const getServerSideProps: GetServerSideProps = async context =>
  withServerSideAuthConfirmation(context);

Page.getLayout = () => Layout;

export default Page;
