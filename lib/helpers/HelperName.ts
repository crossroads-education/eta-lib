export class HelperName {
    /**
    Returns raw.split(" ")[0], first letter capitalized, all others lowercase.
    */
    public static normalize(raw : string) : string {
        let name : string = raw.split(" ")[0];
        return raw.substring(0, 1).toUpperCase() + raw.substring(1).toLowerCase();
    }
}
