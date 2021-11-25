import makeStyles from "@sonnat/ui/styles/makeStyles";
import Head from "next/head";
import * as React from "react";
import { FormBuilderLayout } from "components/layout";
import type { Layout, NextPageWithLayout } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {},
      container: {
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08);",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        padding: pxToRem(32),
        borderRadius: pxToRem(8)
      },
      block: {
        border: `1px dashed ${colors.divider}`,
        borderRadius: pxToRem(8),
        padding: pxToRem(16),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& + &": { marginTop: pxToRem(16) }
      },
      blockTitle: {
        ...variants.subtitle,
        color: colors.text.secondary
      }
    };
  },
  { name: "Page" }
);

const Page: NextPageWithLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head>{setTitleMeta("PORSER | ساخت فرم")}</Head>
      <div className={classes.container}>
        <div className={classes.block}>
          <span className={classes.blockTitle}>متغیرها</span>
        </div>
        <div className={classes.block}>
          <span className={classes.blockTitle}>شروع و خوشامدگویی</span>
        </div>
        <div className={classes.block}>
          <span className={classes.blockTitle}>سؤالات</span>
        </div>
        <div className={classes.block}>
          <span className={classes.blockTitle}>پایان و تشکر</span>
        </div>
      </div>
    </div>
  );
};

const PageLayout: Layout = page => (
  <FormBuilderLayout>{page}</FormBuilderLayout>
);

Page.getLayout = () => PageLayout;

export default Page;
