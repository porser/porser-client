import { CssBaseline, PageLoader } from "@sonnat/ui";
import { makeStyles, SonnatInitializer } from "@sonnat/ui/styles";
import { PageSuspension } from "components/partial";
import Head from "next/head";
import * as React from "react";
import smoothScroll from "smoothscroll-polyfill";
import { useAuthState, usePageState } from "store";
import theme from "theme";
import type { AppPropsWithLayout } from "types";
import {
  is404Page,
  is500Page,
  removeAccessToken,
  renderErrorPage,
  setCanonicalMeta,
  setDescriptionMeta,
  setKeywordsMeta,
  setTitleMeta,
  useConfirmAuthentication
} from "utils";
import type { Custom404Page } from "./404";
import type { Custom500Page } from "./500";

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

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-account"
];

const App = (props: AppPropsWithLayout): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component: Page, pageProps, router } = props;

  useGlobalStyles();

  const getPageLayout =
    Page.getLayout || (() => (page: React.ReactNode) => page);

  const withPageLayout = getPageLayout();

  const isPageLoading = usePageState(state => state.isPageLoading);
  const setPageLoading = usePageState(state => state.setPageLoading);

  const setUser = useAuthState(state => state.setUser);

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

  React.useEffect(() => {
    if (PUBLIC_ROUTES.includes(router.pathname)) {
      setUser(null);
      removeAccessToken();
    }
  }, [router.pathname, setUser]);

  const is404 = is404Page(Page as unknown as Custom404Page);
  const is500 = is500Page(Page as unknown as Custom500Page);

  const shouldProtect =
    !(is404 || is500) && !PUBLIC_ROUTES.includes(router.pathname);

  const { authenticating, error, authenticationError, ...otherErrors } =
    useConfirmAuthentication(shouldProtect);

  const hasServerErrors = error && !authenticationError;
  const isPageSuspended =
    shouldProtect && (authenticating || !!authenticationError);

  React.useEffect(() => {
    if (authenticationError) void router.replace("/login");
  }, [authenticationError, router]);

  return (
    <SonnatInitializer theme={theme} injectFirst>
      <Head>
        {setTitleMeta(is404 || is500 ? "PORSER | خطا" : "PORSER")}
        {setKeywordsMeta([
          "porser",
          "پرسر",
          "پُرسِر",
          "online",
          "platform",
          "form",
          "survey",
          "poll",
          "نظرسنجی",
          "فرم",
          "ux research",
          "ریسرچ",
          "تحقیق",
          "بررسی کاربران"
        ])}
        {setDescriptionMeta(
          "پُرسِر پلتفرمی آنلاین برای ساخت انواع فرم، آزمون و نظرسنجی می‌باشد."
        )}
        {setCanonicalMeta(`https://porser.io${router.pathname}`)}
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
            <PageSuspension suspend={isPageSuspended}>
              {hasServerErrors ? (
                renderErrorPage(otherErrors)
              ) : (
                <Page {...pageProps} />
              )}
            </PageSuspension>
          </React.Fragment>
        )}
      </div>
    </SonnatInitializer>
  );
};

export default App;
