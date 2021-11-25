import type {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceAddons,
  ServiceMethods
} from "@feathersjs/feathers";
import type { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import * as React from "react";

export type Layout = (page: React.ReactNode) => React.ReactNode;

export type GetLayout = () => Layout;

export type NextComponentTypeWithLayout<P = Record<string, never>> =
  NextComponentType<NextPageContext, unknown, P> & {
    getLayout?: GetLayout;
  };

export type NextPageWithLayout<
  P = Record<string, never>,
  IP = P
> = NextComponentType<NextPageContext, IP, P> & {
  getLayout?: GetLayout;
};

export type AppPropsWithLayout<P = Record<string, never>> = AppProps<P> & {
  Component: NextComponentTypeWithLayout<P>;
};

export interface FeathersServiceOptions {
  events: string[];
  multi: boolean | string[];
  id: string;
  paginate: {
    default?: number;
    max?: number;
  };
  whitelist: string[];
  filters: string[];
}

declare class FeathersAdapterService<T = unknown> implements ServiceMethods<T> {
  options: FeathersServiceOptions;
  constructor(options: Partial<FeathersServiceOptions>);
  get id(): string;
  get events(): string[];
  filterQuery(
    params?: Params,
    opts?: unknown
  ): {
    [key: string]: unknown;
  } & {
    paginate:
      | false
      | Pick<import("@feathersjs/feathers").PaginationOptions, "max">
      | {
          default?: number;
          max?: number;
        };
  };
  allowsMulti(method: string): boolean;
  find(params?: Params): Promise<T[] | Paginated<T>>;
  get(id: Id, params?: Params): Promise<T>;
  create(data: Partial<T> | Partial<T>[], params?: Params): Promise<T | T[]>;
  update(id: Id, data: T, params?: Params): Promise<T>;
  patch(id: NullableId, data: Partial<T>, params?: Params): Promise<T | T[]>;
  remove(id: NullableId, params?: Params): Promise<T | T[]>;
}

export type Service<T = unknown> = FeathersAdapterService<T> & ServiceAddons<T>;

export interface IUserRaw {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  isVerified: boolean;
}

export type User = Omit<IUserRaw, "password">;

export type ObjectLiteralKeys = string | number | symbol;
export type ObjectLiteral = Record<ObjectLiteralKeys, unknown>;
export type AnyObject = ObjectLiteral;
export type EmptyObject = Record<ObjectLiteralKeys, never>;

export type LogicalOperationsKeys =
  | "equals"
  | "not_equals"
  | "starts_with"
  | "ends_with"
  | "includes"
  | "not_includes"
  | "greater_than"
  | "less_than"
  | "equal_or_less_than"
  | "equal_or_geater_than";

export type TextLogicalOperations = Array<
  Extract<
    LogicalOperationsKeys,
    | "equals"
    | "not_equals"
    | "starts_with"
    | "ends_with"
    | "includes"
    | "not_includes"
  >
>;

export type NumberLogicalOperations = Array<
  Extract<
    LogicalOperationsKeys,
    | "equals"
    | "not_equals"
    | "greater_than"
    | "less_than"
    | "equal_or_less_than"
    | "equal_or_geater_than"
  >
>;

export type SelectLogicalOperations = Array<
  Extract<LogicalOperationsKeys, "equals" | "not_equals">
>;

export interface GeneralProps<
  LogicalOperations extends Array<LogicalOperationsKeys>,
  T = unknown
> {
  defaultValue?: T;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  allowedOperations: LogicalOperations;
}

export interface ConditionDoFnParam<T = unknown, Required = boolean> {
  value: T;
  optional: Required;
}

export interface ConditionsFns {
  goto: {
    action: "goto";
    params: ConditionDoFnParam<string, true>;
  };
}

export interface Condition<
  Field extends FieldProps,
  FieldName extends keyof FieldTypes
> {
  id: string;
  check: {
    field: FieldName;
    operator: Field["allowedOperations"];
    against: Field["defaultValue"];
  };
}

export interface ConditionFieldProps<
  Field extends FieldProps = FieldProps,
  FieldName extends keyof FieldTypes = keyof FieldTypes,
  Fn extends keyof ConditionsFns = keyof ConditionsFns
> {
  conditions: Condition<Field, FieldName>[];
  otherwise: { do: ConditionsFns[Fn] };
  do: ConditionsFns[Fn];
}

export type SingleLineTextFieldProps = GeneralProps<
  TextLogicalOperations,
  string
>;

export type MultiLineTextFieldProps = GeneralProps<
  TextLogicalOperations,
  string
>;

export type EmailFieldProps = GeneralProps<TextLogicalOperations, string>;
export type URLFieldProps = GeneralProps<TextLogicalOperations, string>;
export type NumberFieldProps = GeneralProps<TextLogicalOperations, "number">;
export type ChoiceFieldProps = GeneralProps<TextLogicalOperations, string>;

export type FieldTypes = {
  SINGLE_LINE_TEXT: "SINGLE_LINE_TEXT";
  MULTI_LINE_TEXT: "MULTI_LINE_TEXT";
  EMAIL: "EMAIL";
  URL: "URL";
  NUMBER: "NUMBER";
  CONDITION: "CONDITION";
  CHOICE: "CHOICE";
};

export type FieldProps =
  | SingleLineTextFieldProps
  | MultiLineTextFieldProps
  | EmailFieldProps
  | URLFieldProps
  | NumberFieldProps
  | ChoiceFieldProps;

export interface FieldParams {
  title: string;
  description?: string;
  type: keyof FieldTypes;
  // props: Omit<Props, "allowedOperations" | "index">;
}
