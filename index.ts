import * as mysql from "mysql";
import * as socketIO from "socket.io";

// *** Instances ***

// config
import { Configuration } from "./lib/interfaces/Configuration";
export let config: Configuration;

// logger
import { Logger } from "./lib/classes/Logger";
export let logger: Logger;

// database
export let db: mysql.IConnection;

// server
import { ServerConfiguration } from "./lib/interfaces/ServerConfiguration";
export let server: ServerConfiguration = {
    "modules": {}
};

// *** classes ***
export { Logger } from "./lib/classes/Logger";

// *** helpers ***
export { HelperCrypto as crypto } from "./lib/helpers/HelperCrypto";
export { HelperFS as fs } from "./lib/helpers/HelperFS";
export { HelperHttp as http } from "./lib/helpers/HelperHttp";
export { HelperName as name } from "./lib/helpers/HelperName";
export { HelperObject as object } from "./lib/helpers/HelperObject";
export { HelperParams as params } from "./lib/helpers/HelperParams";
export { HelperRedirect as redirect } from "./lib/helpers/HelperRedirect";
export {HelperShell as shell} from "./lib/helpers/HelperShell";
export { HelperSql as sql, ValueResult as SqlValueResult } from "./lib/helpers/HelperSql";
export {HelperSystem as system} from "./lib/helpers/HelperSystem";
export { HelperTime as time } from "./lib/helpers/HelperTime";

// *** interfaces ***
export { Configuration } from "./lib/interfaces/Configuration";
export { IError as DBError } from "mysql";
export { Model } from "./lib/interfaces/Model";
export { ModelParams } from "./lib/interfaces/ModelParams";
export { ModuleConfiguration } from "./lib/interfaces/ModuleConfiguration";
export { TimeSpan } from "./lib/interfaces/TimeSpan";
