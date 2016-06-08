export class HelperObject {
    /**
    Returns a deep copy of an object.
    Borrowed from http://stackoverflow.com/a/7574273
    */
    public static copy(obj : any) : any {
        if (obj == null || typeof(obj) !== "object") {
            return obj; // any non-objects are passed by value, not reference
        }
        let temp : any = new obj.constructor();
        for (let key in obj) {
            temp[key] = HelperObject.copy(obj[key]);
        }
        return temp;
    }
}
