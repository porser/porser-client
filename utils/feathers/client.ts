import authenticationService from "@feathersjs/authentication-client";
import feathers from "@feathersjs/feathers";
import socketIoService from "@feathersjs/socketio-client";
import { ACCESS_TOKEN_COOKIE_KEY } from "constants.app";
import { CookieStorage } from "cookie-storage";
import socketIoClient from "socket.io-client";
import type { IUserRaw, Service } from "types";
import hooks from "./client.hooks";

interface ServiceTypes {
  users: Service<IUserRaw>;
  "refresh-tokens": Service<unknown>;
  "password-management": Service<unknown>;
  "verify-account": Service<unknown>;
}

const socket = socketIoClient("http://localhost:3030");
const client = feathers<ServiceTypes>();

client.configure(socketIoService(socket));
client.configure(
  authenticationService({
    storage: new CookieStorage(),
    storageKey: ACCESS_TOKEN_COOKIE_KEY
  })
);

client.hooks(hooks);

export type FeathersClient = typeof client;

export default client;
