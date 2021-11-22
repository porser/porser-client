import Custom500, { Custom500Page } from "pages/500";

const is500Page = (page: Custom500Page): page is typeof Custom500 =>
  page === Custom500;

export default is500Page;
