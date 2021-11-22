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
