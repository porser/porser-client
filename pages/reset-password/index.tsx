import makeStyles from "@sonnat/ui/styles/makeStyles";
import makePwdManagementAPI from "apis/pwd-management.api";
import ResetPasswordForm from "components/form/ResetPasswordForm";
import AuthLayout from "components/layout/AuthLayout";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";
import { renderErrorPage, setTitleMeta } from "utils";
import feathersClient from "utils/feathers/client";
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
  token?: string;
  preRenderErrors?: {
    globalError?: ErrorType;
    connectionError?: ErrorType;
  };
}

const Page: NextPageWithLayout<Props> = props => {
  const { preRenderErrors, token } = props;

  const classes = useStyles();

  if (preRenderErrors) return renderErrorPage(preRenderErrors);

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | بازنشانی رمز عبور")}</Head>
      <section className={classes.root}>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <ResetPasswordForm token={token!} className={classes.form} />
      </section>
    </React.Fragment>
  );
};

const PageLayout: Layout = page => <AuthLayout>{page}</AuthLayout>;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { query } = await Promise.resolve(context);
  const preRenderErrors: Props["preRenderErrors"] = {};

  const token = query.token as string | undefined;

  if (!token) return { notFound: true };

  const api = makePwdManagementAPI(feathersClient);
  const response = await api.verifyResetToken(token);

  if (response.error && response.errors) {
    if (response.errors.global) {
      preRenderErrors.globalError = response.errors.global;
    } else if (response.errors.connection) {
      preRenderErrors.connectionError = response.errors.connection;
    }

    return { props: { preRenderErrors } };
  } else return { props: { token } };
};

Page.getLayout = () => PageLayout;

export default Page;
