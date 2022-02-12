import ServerStyleSheets from "@sonnat/ui/styles/ServerStyleSheets";
import AutoPrefixer from "autoprefixer";
import CleanCss from "clean-css";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";
import PostCss from "postcss";
import * as React from "react";

const prefixer = PostCss([AutoPrefixer]);
const cleaner = new CleanCss();

export default class MyDocument extends Document {
  static override async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();

    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);

    const css = sheets.toString();
    const sheetId = sheets.getStyleElementId();

    const minifiedCSS = await (async rawCSS => {
      // It might be undefined, e.g. after an error.
      if (rawCSS) {
        return cleaner.minify(
          (await prefixer.process(rawCSS, { from: undefined })).css
        ).styles;
      } else return rawCSS;
    })(css);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        <style key={sheetId} id={sheetId}>
          {minifiedCSS}
        </style>
      ]
    };
  }

  override render(): JSX.Element {
    return (
      <Html lang="en-US">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta property="robots" content="Index, Follow" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="google" content="notranslate" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="og:image" content="/meta-facebook-image.png" />
          <meta name="twitter:image" content="/meta-twitter-image.png" />
          <meta
            name="twitter:image:alt"
            content="Porser is a Persian open-source web application that specializes in building online form, surveys, quizzes and polls."
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <meta name="application-name" content="Porser" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ea475b" />
          <meta name="msapplication-TileColor" content="#27184f" />
          <meta name="theme-color" content="#27184f" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
