import * as site from "../autoload";

import * as express from "express";

export interface Model {
    render(req : express.Request, res : express.Response, callback : (env : {[key : string] : any}) => void) : void;
}
