import * as oracledb from "oracledb";

/**
Helpers to make Oracle DB connections conform to MySQL convention to some extent.
*/
export class HelperOracle {
    /**
    Collects all rows from a query into one array without absurd memory allocation.
    Borrowed and modified from https://gist.github.com/bjouhier/f4f991895fbe62ab1972.
    */
    public static queryAll(conn: oracledb.IConnection, sql: string, params: string[], callback: (err: Error, rows?: any[], metadata?: any) => void): void {
        let allRows: any[][] = [];
        conn.execute(sql, params, {
            "outFormat": oracledb.OBJECT,
            "resultSet": true
        }, (err: Error, result: oracledb.IExecuteReturn) => {
            if (err) {
                return callback(err);
            }
            function fetch() {
                let max: number = 50;
                result.resultSet.getRows(max, (err: Error, rows: any[][]) => {
                    if (err) {
                        return callback(err);
                    }
                    allRows = allRows.concat(rows);
                    if (rows.length === max) {
                        fetch();
                    } else {
                        result.resultSet.close((err: Error) => {
                            if (err) {
                                return callback(err);
                            }
                            callback(null, allRows, result.metaData);
                        });
                    }
                });
            }
            fetch.apply(this);
        });
    }
}
