import * as eta from "../../index";

import * as express from "express";

export class HelperRedirect {
    public static back(req : express.Request, res : express.Response) {
        if (req.session["returnTo"]) {
            res.redirect(req.session["returnTo"]);
        } else {
            res.redirect("/");
        }
    }
}
