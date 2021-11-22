import Custom404, { Custom404Page } from "pages/404";

const is404Page = (page: Custom404Page): page is typeof Custom404 =>
  page === Custom404;

export default is404Page;
