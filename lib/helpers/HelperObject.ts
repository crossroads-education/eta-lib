export class HelperObject {
    /**
    Returns a deep copy of an object.
    Borrowed from http://stackoverflow.com/a/7574273
    */
    public static copy(obj: any): any {
        if (obj == null || typeof (obj) !== "object") {
            return obj; // any non-objects are passed by value, not reference
        }
        if (obj instanceof Date) {
            return new Date(obj.toISOString());
        }
        let temp: any = new obj.constructor();
        for (let key in obj) {
            temp[key] = this.copy(obj[key]);
        }
        return temp;
    }

    public static extend(obj: any, template: any): any {
        for (let i in template) {
            if (!obj[i] && obj[i] !== 0) { // handle 0, since !0 == true
                obj[i] = this.copy(template[i]);
            }
        }
        return obj;
    }
}
