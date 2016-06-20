export class HelperCsv {
    public static export( data : any[] ) : string {
        let lines : string[] = [];
        for(let i in data) {
            let tokens : string[] = [];
            for(let j in data[i]) {
                tokens.push(data[i][j]);
            }
            lines.push(tokens.join(","));
        }
        return lines.join("\n");
    }

    public static parse( data : string ) : string[][] {
        let result : string[][] = [];
        let lines : string[] = data.split("\n");
        for(let i : number = 0; i < lines.length; i ++){
            result.push(data.split(","));
        }
        return result;
    }
}
