import { ChevronRight, CogO, EyeO } from "@sonnat/icons";
import { Button, Flex, FlexItem, NoSsr, Text } from "@sonnat/ui";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import { FormBuilderLayout, WithHeader } from "components/layout";
import FormBuilderContext, {
  INITIAL_STATE,
  reducer,
  type IContext
} from "context/FormBuilderContext";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import type { PageLayout, PorserNextPage } from "types";
import { setTitleMeta } from "utils";

const useStyles = makeStyles({ root: {} }, { name: "Page" });

const Page: PorserNextPage<{
  projectId: string;
  projectName: string;
}> = () => {
  const classes = useStyles();

  return (
    <main id="main" className={classes.root}>
      <Head>{setTitleMeta("PORSER | ساخت فرم")}</Head>
    </main>
  );
};

const useSubHeaderStyles = makeStyles(
  ({ spacings: { spaces } }) => ({
    root: {},
    icon: { marginLeft: spaces[1].rem },
    title: { marginRight: spaces[7].rem },
    controls: { "& > * + *": { marginRight: spaces[3].rem } }
  }),
  { name: "SubHeader" }
);

const PageSubHeader = () => {
  const classes = useSubHeaderStyles();

  return (
    <Flex
      className={classes.root}
      mainAxisAlignment="between"
      crossAxisAlignment="center"
    >
      <FlexItem crossAxisSelfAlignment="center">
        <Text variant="caption" as="a" href="#" color="textSecondary">
          <ChevronRight className={classes.icon} size={16} />
          پروژه پژوهش املاک
        </Text>
        <Text className={classes.title} variant="h6" as="strong">
          عنوان پرسش‌نامه
        </Text>
      </FlexItem>
      <FlexItem className={classes.controls} crossAxisSelfAlignment="center">
        <Button
          size="large"
          label="تنظیمات"
          leadingIcon={<CogO />}
          variant="inlined"
        />
        <Button
          size="large"
          label="پیش‌نمایش"
          leadingIcon={<EyeO />}
          variant="inlined"
        />
        <Button size="large" label="انتشار" variant="filled" color="primary" />
      </FlexItem>
    </Flex>
  );
};

const Layout: PageLayout = page => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  const context = React.useMemo<IContext>(() => ({ state, dispatch }), [state]);

  return (
    <WithHeader subHeader={<PageSubHeader />}>
      <NoSsr>
        <FormBuilderContext.Provider value={context}>
          <FormBuilderLayout>{page}</FormBuilderLayout>
        </FormBuilderContext.Provider>
      </NoSsr>
    </WithHeader>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  await Promise.resolve();

  const projectId = ctx.query.projectId as string | undefined;

  if (!projectId) return { notFound: true };
  return { props: { projectId, projectName: "پروژه اول" } };
};

Page.getLayout = () => Layout;

export default Page;
