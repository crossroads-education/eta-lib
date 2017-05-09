import * as knexLib from "knex";
import * as mysql from "mysql";
import * as nodemailer from "nodemailer";

// *** Instances ***

// config
import { Configuration } from "./lib/interfaces/Configuration";
export let config: Configuration;

// email
export let mail: nodemailer.Transporter;

// logger
import { Logger } from "./lib/classes/Logger";
export let logger: Logger;

// database
export let db: mysql.IConnection;
export let knex: knexLib;

// server
import { ServerConfiguration } from "./lib/interfaces/ServerConfiguration";
export let server: ServerConfiguration = {
    "modules": {}
};

// *** classes ***
export { Logger } from "./lib/classes/Logger";
export { PermissionUser } from "./lib/classes/PermissionUser";

// *** helpers ***
export { HelperCrypto as crypto } from "./lib/helpers/HelperCrypto";
export { HelperFS as fs } from "./lib/helpers/HelperFS";
export { HelperHttp as http } from "./lib/helpers/HelperHttp";
export { HelperName as name } from "./lib/helpers/HelperName";
export { HelperNavbar as navbar } from "./lib/helpers/HelperNavbar";
export { HelperObject as object } from "./lib/helpers/HelperObject";
export { HelperParams as params } from "./lib/helpers/HelperParams";
export { HelperRedirect as redirect } from "./lib/helpers/HelperRedirect";
export { HelperSql as sql, ValueResult as SqlValueResult } from "./lib/helpers/HelperSql";
export { HelperTime as time } from "./lib/helpers/HelperTime";

// *** database helpers ***
export { HelperAthlete as athlete } from "./lib/helpers/database/HelperAthlete";
export { HelperCenter as center } from "./lib/helpers/database/HelperCenter";
export { HelperCourse as course } from "./lib/helpers/database/HelperCourse";
export { HelperLogin as login } from "./lib/helpers/database/HelperLogin";
export { HelperMetadata as metadata } from "./lib/helpers/database/HelperMetadata";
export { HelperPermission as permission } from "./lib/helpers/database/HelperPermission";
export { HelperPerson as person } from "./lib/helpers/database/HelperPerson";
export { HelperPosition as position } from "./lib/helpers/database/HelperPosition";
export { HelperProfessor as professor } from "./lib/helpers/database/HelperProfessor";
export { HelperSection as section } from "./lib/helpers/database/HelperSection";
export { HelperSetting as setting } from "./lib/helpers/database/HelperSetting";
export { HelperSignin as signin } from "./lib/helpers/database/HelperSignin";
export { HelperStudent as student } from "./lib/helpers/database/HelperStudent";
export { HelperTerm as term } from "./lib/helpers/database/HelperTerm";
export { HelperVisit as visit } from "./lib/helpers/database/HelperVisit";

// *** database interfaces ***
export { Center } from "./lib/interfaces/database/Center";
export { Course } from "./lib/interfaces/database/Course";
export { Employee } from "./lib/interfaces/database/Employee";
export { EmployeeSchedule } from "./lib/interfaces/database/EmployeeSchedule";
export { HoursOfOperation } from "./lib/interfaces/database/HoursOfOperation";
export { PageMetadata } from "./lib/interfaces/database/PageMetadata";
export { Person } from "./lib/interfaces/database/Person";
export { Schedule } from "./lib/interfaces/database/Schedule";
export { Section } from "./lib/interfaces/database/Section";
export { Setting } from "./lib/interfaces/database/Setting";
export { Student } from "./lib/interfaces/database/Student";
export { StudentSection } from "./lib/interfaces/database/StudentSection";
export { Term } from "./lib/interfaces/database/Term";
export { Visit } from "./lib/interfaces/database/Visit";

// *** interfaces ***
export { Configuration } from "./lib/interfaces/Configuration";
export { IError as DBError } from "mysql";
export { Model } from "./lib/interfaces/Model";
export { ModelParams } from "./lib/interfaces/ModelParams";
export { ModuleConfiguration } from "./lib/interfaces/ModuleConfiguration";
export { TimeSpan } from "./lib/interfaces/TimeSpan";

// *** integrations ***
import * as nexus from "./lib/integration/nexus";
export { nexus };
export { HelperWizIQ as wiziq } from "./lib/helpers/integration/HelperWizIQ";
