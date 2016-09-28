import { ModuleConfiguration } from "./ModuleConfiguration";

interface Module extends ModuleConfiguration {
    baseDir: string;
}

export interface ServerConfiguration {
    modules: { [key: string]: Module };
}
