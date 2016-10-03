export interface ValueResult {
    columns: string;
    sql: string;
    params: any[];
}

export class HelperSql {
    /**
    Returns:
    {
        columns : string; // (a, b, c)
        sql : string; // (?, ?, ...), (?, ?, ...), ...
        params : any[]; // all the passed rows, collapsed into a 1D array
    }
    */
    public static getInsertMany(rows: any[], shouldGenerateColumns: boolean): ValueResult {
        if (rows.length === 0) {
            return {
                "columns": "",
                "sql": "",
                "params": []
            };
        }
        let sql: string[] = [];
        let params: any[] = [];
        for (let i: number = 0; i < rows.length; i++) {
            let rowSql: string[] = [];
            for (let k in rows[i]) {
                rowSql.push("?");
                params.push(rows[i][k]);
            }
            sql.push("(" + rowSql.join(",") + ")");
        }
        let columns: string[] = [];
        if (shouldGenerateColumns) {
            for (let i in rows[0]) {
                columns.push(i);
            }
        }
        return {
            "columns": "(" + columns.join(",") + ")",
            "sql": sql.join(","),
            "params": params
        };
    }
}
