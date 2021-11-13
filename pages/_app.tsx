import CssBaseline from "@sonnat/ui/CssBaseline";
import PageLoader from "@sonnat/ui/PageLoader";
import makeStyles from "@sonnat/ui/styles/makeStyles";
import SonnatInitializer from "@sonnat/ui/styles/SonnatInitializer";
import Head from "next/head";
import * as React from "react";
import smoothScroll from "smoothscroll-polyfill";
import { usePageState } from "store";
import theme from "theme";
import type { AppPropsWithLayout } from "types";
import { setTitleMeta } from "utils";

import "public/static/fonts.css";

const useGlobalStyles = makeStyles(
  {
    "@global": {
      "html, body": { scrollBehavior: "smooth" },
      img: { verticalAlign: "middle" },
      a: { textDecoration: "none", color: "currentcolor" }
    }
  },
  { name: "GlobalStyles" }
);

const App = (props: AppPropsWithLayout): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component: Page, pageProps, router } = props;

  useGlobalStyles();

  const getPageLayout =
    Page.getLayout || (() => (page: React.ReactNode) => page);

  const withPageLayout = getPageLayout();

  const isPageLoading = usePageState(state => state.isPageLoading);
  const setPageLoading = usePageState(state => state.setPageLoading);

  React.useEffect(() => {
    const routeChangeStart = () => setPageLoading(true);
    const routeChangeComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const sonnatServerStyles = document.getElementById("sonnat-jss-ssr");

    if (sonnatServerStyles)
      sonnatServerStyles.parentElement?.removeChild(sonnatServerStyles);
  }, []);

  React.useEffect(() => void smoothScroll.polyfill(), []);

  return (
    <SonnatInitializer theme={theme} injectFirst>
      <Head>
        {setTitleMeta(
          "Porser | Porser is a Persian web application that specializes in building online form, surveys, quizzes and polls."
        )}
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=5.0, minimum-scale=1.0"
          key="viewport"
        />
      </Head>
      <div id="main-wrapper">
        <CssBaseline />
        {withPageLayout(
          <React.Fragment>
            <PageLoader loading={isPageLoading} />
            <Page {...pageProps} />
          </React.Fragment>
        )}
      </div>
    </SonnatInitializer>
  );
};

export default App;
