import * as eta from "../../index";
import * as express from "express";

export interface Model {
    setParams?(params: eta.ModelParams): void;
    onScheduleInit?(): void;
    render(req: express.Request, res: express.Response, callback: (env: { [key: string]: any }) => void): void;
    renderAfter?(html: string, res: express.Response): void;
}
