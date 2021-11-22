import { NOT_FOUND_ERROR } from "constants.app";
import type { NextPageWithLayout } from "types";

export type Custom404Page = NextPageWithLayout<{ title: string | undefined }>;

const Custom404: Custom404Page = props => {
  const { title = NOT_FOUND_ERROR } = props;
  return <h1>{title}</h1>;
};

export default Custom404;
