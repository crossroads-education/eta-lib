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
export {HelperObject as object} from "./lib/helpers/HelperObject";
export {HelperParams as params} from "./lib/helpers/HelperParams";

// *** database helpers ***
export {HelperAthlete as athlete} from "./lib/helpers/database/HelperAthlete";
export {HelperCenter as center} from "./lib/helpers/database/HelperCenter";
export {HelperCourse as course} from "./lib/helpers/database/HelperCourse";
export {HelperMetadata as metadata} from "./lib/helpers/database/HelperMetadata";
export {HelperPerson as person} from "./lib/helpers/database/HelperPerson";
export {HelperSection as section} from "./lib/helpers/database/HelperSection";
export {HelperSetting as setting} from "./lib/helpers/database/HelperSetting";
export {HelperStudent as student} from "./lib/helpers/database/HelperStudent";
export {HelperTerm as term} from "./lib/helpers/database/HelperTerm";

// *** database interfaces ***
export {Center} from "./lib/interfaces/database/Center";
export {Course} from "./lib/interfaces/database/Course";
export {PageMetadata} from "./lib/interfaces/database/PageMetadata";
export {Person} from "./lib/interfaces/database/Person";
export {Section} from "./lib/interfaces/database/Section";
export {Setting} from "./lib/interfaces/database/Setting";
export {Student} from "./lib/interfaces/database/Student";
export {StudentSection} from "./lib/interfaces/database/StudentSection";
export {Term} from "./lib/interfaces/database/Term";


// *** interfaces ***
export {Model} from "./lib/interfaces/Model";
export {ModuleConfiguration} from "./lib/interfaces/ModuleConfiguration";
