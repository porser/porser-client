import type { NextPage } from "next";
import type { ErrorProps } from "next/error";
import Custom404 from "./404";
import Custom500 from "./500";

const ErrorPage: NextPage<ErrorProps> = props => {
  const { title, statusCode } = props;

  if (statusCode === 404) return <Custom404 title={title} />;

  return <Custom500 title={title} />;
};

export default ErrorPage;
