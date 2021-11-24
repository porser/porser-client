import makeStyles from "@sonnat/ui/styles/makeStyles";
import SingleLineText from "components/core/SingleLineText/SingleLineText";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: "Page" }
);

const Page: NextPageWithLayout = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | فرم رو پر کنید")}</Head>
      <section className={classes.root}>
        <SingleLineText />
      </section>
    </React.Fragment>
  );
};

const PageLayout: Layout = page => <React.Fragment>{page}</React.Fragment>;

export const getServerSideProps: GetServerSideProps = async () => {
  await Promise.resolve();
  return { props: {} };
};
Page.getLayout = () => PageLayout;

export default Page;
