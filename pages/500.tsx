import { SERVER_ERROR } from "constants.app";
import type { PorserNextPage } from "types";

export type Custom500Page = PorserNextPage<{ title: string | undefined }>;

const Custom500: Custom500Page = props => {
  const { title = SERVER_ERROR } = props;
  return <h1>{title}</h1>;
};

export default Custom500;
