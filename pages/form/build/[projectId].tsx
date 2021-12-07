import {
  Button,
  Column,
  Container,
  Divider,
  Row,
  Switch,
  Breadcrumb,
  BreadcrumbItem
} from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import { ControlsPanel } from "components/container";
import { WithHeader } from "components/layout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types";
import { setTitleMeta } from "utils";

const noopFunction = () => void 0;

interface IContext {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export const Context = React.createContext<IContext>({
  activeTab: 0,
  setActiveTab: noopFunction
});

const useStyles = makeStyles(
  theme => {
    const {
      typography: { pxToRem, variants }
    } = theme;

    return {
      root: {},
      controlsPanel: {},
      resultsPanel: {},
      breadcrumb: { marginTop: pxToRem(16), marginBottom: pxToRem(16) },
      meta: {
        display: "flex",
        alignItems: "center",
        paddingBottom: pxToRem(32)
      },
      title: { ...variants.h6 },
      actions: {
        display: "flex",
        alignItems: "center",
        marginRight: "auto"
      },
      divider: {
        marginRight: pxToRem(8),
        marginTop: pxToRem(8),
        marginBottom: pxToRem(8)
      },
      saveFormBtn: { marginRight: pxToRem(8) },
      previewBtn: { marginRight: pxToRem(16) }
    };
  },
  { name: "Page" }
);

const Page: NextPageWithLayout<{ projectId: string; projectName: string }> = ({
  projectId,
  projectName
}) => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(0);

  const context = React.useMemo(
    () => ({
      activeTab,
      setActiveTab
    }),
    [activeTab]
  );

  return (
    <main id="main" className={classes.root}>
      <Head>{setTitleMeta("PORSER | ساخت فرم")}</Head>
      <Container>
        <Breadcrumb className={classes.breadcrumb}>
          <BreadcrumbItem>
            <Link href={`/dashboard/project/${projectId}`}>
              <a title={projectName}>{projectName}</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>ساخت فرم</BreadcrumbItem>
        </Breadcrumb>
        <div className={classes.meta}>
          <span className={classes.title}>عنوان فرم</span>
          <div className={classes.actions}>
            <Switch label="فعال" defaultChecked={true} size="large" />
            <Divider vertical className={classes.divider} />
            <Button
              label="پیش‌نمایش"
              size="large"
              variant="outlined"
              className={classes.previewBtn}
            />
            <Button
              label="ثبت فرم"
              color="primary"
              size="large"
              className={classes.saveFormBtn}
            />
          </div>
        </div>
        <Row>
          <Context.Provider value={context}>
            <Column all="12" lg="5" xlg="4">
              <ControlsPanel className={classes.controlsPanel} />
            </Column>
            <Column all="12" lg="7" xlg="8">
              {/* <ResultsPanel className={classes.resultsPanel} /> */}
            </Column>
          </Context.Provider>
        </Row>
      </Container>
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
