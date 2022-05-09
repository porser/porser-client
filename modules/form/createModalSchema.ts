import type { Fields } from "./FormSerializer";

export type PropType =
  | "string"
  | "stringarray"
  | "choices"
  | "options"
  | "longstring"
  | "number"
  | "boolean";

type Names<F extends keyof Fields = keyof Fields> = keyof Fields[F];

type Args<F extends keyof Fields = keyof Fields> = {
  label: string;
  required: boolean;
  name: Names<F> | `toggle-${Exclude<Names<F>, symbol>}`;
  type: PropType;
  description?: string;
  toggleChildren?: Args<F>[];
};

export type ModalSchema = {
  label: string;
  required: boolean;
  name: string;
  type: PropType;
  description?: string;
  toggleChildren?: ModalSchema[];
};

const createModalSchema = <F extends keyof Fields = keyof Fields>(
  args: Args<F>
) => ({
  label: args.label,
  required: args.required,
  name: args.name,
  type: args.type,
  description: args.description,
  toggleChildren: args.toggleChildren
});

export default createModalSchema;
