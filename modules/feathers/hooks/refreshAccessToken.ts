import { FeathersError } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";

type MethodsUnion = "create" | "find" | "get" | "patch" | "remove" | "update";

type WhiteList = Record<
  string,
  {
    path: string;
    methods: MethodsUnion[] | "all";
    except?: (context: HookContext) => boolean;
  }
>;

// const _callServiceMethod = (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   serviceMethod: (...args: any[]) => Promise<unknown>,
//   context: HookContext
// ): Promise<unknown> | null => {
//   const { id, method, params } = context;
//   const data = <Record<string, unknown>>context.data;

//   switch (method) {
//     case "create":
//       return serviceMethod(data, params);
//     case "find":
//       return serviceMethod(params);
//     case "get":
//       return serviceMethod(id, params);
//     case "patch":
//       return serviceMethod(id, data, params);
//     case "remove":
//       return serviceMethod(id, params);
//     case "update":
//       return serviceMethod(id, data, params);
//     default:
//       return null;
//   }
// };

const WHITE_LIST: WhiteList = {
  authentication: {
    path: "authentication",
    methods: "all"
  },
  users: {
    path: "users",
    methods: ["create"]
  },
  "verify-account": {
    path: "verify-account",
    methods: ["create"]
  },
  "refresh-tokens": {
    path: "refresh-tokens",
    methods: ["create"]
  },
  "password-management": {
    path: "password-management",
    methods: ["create"],
    except: context => {
      const data = <Record<string, unknown> | undefined>context.data;

      if (!data || !data.type) return false;
      if (data.type !== "CHANGE_PASSWORD") return false;

      return true;
    }
  }
};

const refreshAccessToken =
  (): Hook =>
  async (context: HookContext): Promise<HookContext> => {
    const error: unknown = context.error;

    if (error instanceof FeathersError && error.name === "NotAuthenticated") {
      const white = WHITE_LIST[context.path];

      const isException = !!white.except?.(context);

      const isMethodValid =
        white.methods === "all" || white.methods.includes(context.method);

      if (white && !isException && isMethodValid) return context;

      // const service = context.service;
      // const serviceMethod = service[context.method];

      // const callResult = await _callServiceMethod(serviceMethod, context);

      // eslint-disable-next-line no-console
      console.log("NotAuthenticated error!", context);

      return context;
    }

    return Promise.resolve(context);
  };

export default refreshAccessToken;
