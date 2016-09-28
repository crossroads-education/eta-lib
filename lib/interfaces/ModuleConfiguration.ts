/**
This should never actually be defined in code.
This is just a data structure to represent eta.json.
*/
export interface ModuleConfiguration {
    /**
    The name by which the module is indexed.
    */
    name: string;

    /**
    The base path a module's pages should be mounted to.
    Preceding and succeeding "/" are expected.
    For example, a path of "/foo/" would make the module's pages accessible at "http://localhost:3000/foo/".
    */
    path: string;

    /**
    Optional specification of directory structure.
    These probably shouldn't be modified, so that everything remains consistent.
    The defaults are the key name (so the default for the "models" key is "models").
    */
    dirs?: {
        models?: string;
        static?: string;
        views?: string;
    };
}
