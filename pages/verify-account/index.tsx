import makeStyles from "@sonnat/ui/styles/makeStyles";
import Text from "@sonnat/ui/Text";
import makeUserAPI from "apis/user.api";
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
      result: {
        maxWidth: pxToRem(512),
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        flex: "1 1",
        padding: pxToRem(64),
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: pxToRem(32),
        backdropFilter: "blur(60px)"
      },
      title: { marginBottom: pxToRem(8) }
    };
  },
  { name: "Page" }
);

interface Props {
  preRenderErrors?: {
    globalError?: ErrorType;
    connectionError?: ErrorType;
  };
}

const Page: NextPageWithLayout<Props> = props => {
  const { preRenderErrors } = props;

  const classes = useStyles();

  if (preRenderErrors) return renderErrorPage(preRenderErrors);

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | تأیید حساب کاربری")}</Head>
      <section className={classes.root}>
        <div className={classes.result}>
          <Text variant="h6" rootNode="h1" className={classes.title}>
            حساب کاربری شما با موفقیت تأیید شد
          </Text>
          <Text variant="bodySmall" rootNode="p" color="textSecondary">
            شما می‌توانید از تمامی امکانات <strong>پُرسِر</strong> استفاده کنید.
          </Text>
        </div>
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

  const api = makeUserAPI(feathersClient);
  const response = await api.verify(token);

  if (response.error && response.errors) {
    if (response.errors.global) {
      preRenderErrors.globalError = response.errors.global;
    } else if (response.errors.connection) {
      preRenderErrors.connectionError = response.errors.connection;
    }

    return { props: { preRenderErrors } };
  } else return { props: {} };
};

Page.getLayout = () => PageLayout;

export default Page;
