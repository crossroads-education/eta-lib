import * as eta from "../../index";

import * as express from "express";

export class HelperRedirect {
    public static back(req : express.Request, res : express.Response) {
        if (req.session["returnTo"]) {
            eta.logger.trace("Returning user from " + req.path + " to " + req.session["returnTo"]);
            req.session["returnTo"] = false;
            res.redirect(req.session["returnTo"]);
        } else {
            eta.logger.trace("Returning user from " + req.path + " to root");
            res.redirect("/");
        }
    }
}
