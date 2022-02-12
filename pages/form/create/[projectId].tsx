import makeStyles from "@sonnat/ui/styles/makeStyles";
import { WithHeader } from "components/layout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles(() => ({ root: {} }), { name: "Page" });

const Page: NextPageWithLayout<{ projectId: string; projectName: string }> =
  () => {
    const classes = useStyles();

    return (
      <main id="main" className={classes.root}>
        <Head>{setTitleMeta("PORSER | ساخت فرم")}</Head>
      </main>
    );
  };

const PageLayout: Layout = page => <WithHeader>{page}</WithHeader>;

export const getServerSideProps: GetServerSideProps = async ctx => {
  await Promise.resolve();

  const projectId = ctx.query.projectId as string | undefined;

  if (!projectId) return { notFound: true };
  return { props: { projectId, projectName: "پروژه اول" } };
};

Page.getLayout = () => PageLayout;

export default Page;
