import * as eta from "../../index";
import * as http from "http";
import * as https from "https";
import * as querystring from "querystring";
import * as urllib from "url";

export class HelperHttp {
    public static Success: number = 200;
    public static Redirect: number = 302;
    /**
    Value is 400 per https://stackoverflow.com/a/20215807 and https://tools.ietf.org/html/rfc7231
    Do not use 422, especially now that there is an official solution.
    */
    public static InvalidParameters: number = 400;
    public static Unauthorized: number = 401;
    public static Forbidden: number = 403;
    public static NotFound: number = 404;
    public static InternalError: number = 500;

    public static request(rawUrl: string, method: string, args: { [key: string]: any }, useSSL: boolean, callback: (code: number, response: string) => void, encodeParams: boolean) {
        let argsString: string = "";
        if (encodeParams) {
            argsString = querystring.stringify(args);
        } else {
            for (var i in args) {
                argsString += "&" + i + "=" + args[i];
            }
            argsString = argsString.replace("&", "?"); // This only replaces the first occurrence
        }
        if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
            rawUrl = "http" + (useSSL ? "s" : "") + "s://" + rawUrl;
        }
        let url: urllib.Url = urllib.parse(rawUrl);
        let headers: { [key: string]: (string | number) } = {};
        if (method.toLowerCase() == "post") {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            headers["Content-Length"] = argsString.length;
        }
        let options = {
            "hostname": url.hostname,
            "port": useSSL ? 443 : 80,
            "path": url.path + (method.toLowerCase() == "post" ? "" : argsString),
            "method": method,
            "headers": headers
        };
        let req = (<any>(useSSL ? https : http).request)(options, function(res: any) {
            let response: string = "";
            res.setEncoding("utf8");
            res.on("data", function(chunk: string) {
                response += chunk;
            });
            res.on("error", function(err: NodeJS.ErrnoException) {
                eta.logger.warn(err.message);
                callback(eta.http.InternalError, null);
            });
            res.on("end", function() {
                callback(res.statusCode, response);
            });
        });
        req.on("error", function(err: NodeJS.ErrnoException) {
            eta.logger.warn(err.message);
            callback(eta.http.InternalError, null);
        });
        if (method.toLowerCase() == "post") {
            req.write(argsString);
        }
        req.end();
    }
}
