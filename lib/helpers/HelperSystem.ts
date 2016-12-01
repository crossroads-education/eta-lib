import * as os from "os";

export class HelperSystem {
    public static getExecutableSuffix() : string {
        if (os.platform() == "win32") {
            return ".exe";
        }
        return "";
    }
}
