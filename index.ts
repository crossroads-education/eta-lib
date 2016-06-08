import * as mysql from "mysql";

// *** logger stuff ***
import {Logger} from "./lib/classes/Logger";
export let logger : Logger;

// *** classes ***
export {Logger} from "./lib/classes/Logger";

// *** database stuff ***
export let db : mysql.IConnection;
export {IError as DBError} from "mysql";

// *** helpers ***
export {HelperFS as fs} from "./lib/helpers/HelperFS";
export {HelperHttp as http} from "./lib/helpers/HelperHttp";

// *** database helpers ***
export {HelperMetadata as metadata} from "./lib/helpers/database/HelperMetadata";
export {HelperTerm as term} from "./lib/helpers/database/HelperTerm";

// *** database interfaces ***
export {PageMetadata} from "./lib/interfaces/database/PageMetadata";
export {Term} from "./lib/interfaces/database/Term";

// *** interfaces ***
export {Model} from "./lib/interfaces/Model";
export {ModuleConfiguration} from "./lib/interfaces/ModuleConfiguration";
