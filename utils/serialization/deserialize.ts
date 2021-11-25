import type { Serialize } from "./Form";

const deserialize = (data: Serialize) => {
  return data.views.map(view => view);
};

export default deserialize;
