import makeStyles from "@sonnat/ui/styles/makeStyles";
import Head from "next/head";
import * as React from "react";
import type { PageLayout, PorserNextPage } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles({ root: {} }, { name: "Page" });

const Page: PorserNextPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>{setTitleMeta("PORSER | داشبورد")}</Head>
      <section className={classes.root}>Dashboard Page</section>
    </React.Fragment>
  );
};

const Layout: PageLayout = page => <React.Fragment>{page}</React.Fragment>;

Page.getLayout = () => Layout;

export default Page;
