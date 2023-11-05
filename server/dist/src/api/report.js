"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportNormal = exports.report = void 0;
const index_1 = require("./index");
// /report/:manhole_id
const report = async function (req, res) {
    const { body, params } = req;
    const manhole_id = params.manhole_id;
    const data = body.map((sensor_data) => {
        return {
            acceleration: {
                x: sensor_data[0],
                y: sensor_data[1],
                z: sensor_data[2],
            },
            gyro: {
                x: sensor_data[3],
                y: sensor_data[4],
                z: sensor_data[5],
            },
        };
    });
    let sqlQuery = `
    INSERT INTO Events ( 
        manhole_id, 
        data
    )
    VALUES (
        "${manhole_id}", 
        '${JSON.stringify(data)}'
    );
    `;
    index_1.connection.query(sqlQuery, (err, _) => {
        if (err)
            res.send(err);
        else {
            index_1.connection.query(`
            UPDATE Manhole
            SET status="alarm"
            WHERE manhole_id="${manhole_id}"`, (err, _) => {
                if (err)
                    res.send(err);
                else
                    res.send(`Successfully updated.`);
            });
        }
    });
};
exports.report = report;
const reportNormal = async function (req, res) {
    const { params } = req;
    const manhole_id = params.manhole_id;
    let sqlQuery = `
    UPDATE Manhole
    SET status="normal"
    WHERE manhole_id="${manhole_id}"
    `;
    index_1.connection.query(sqlQuery, (err, _) => {
        if (err)
            res.send(err);
        else {
            index_1.connection.query(`
                DELETE FROM Events
                WHERE manhole_id="${manhole_id}";
            `, (err, _) => {
                if (err)
                    res.send(err);
                else
                    res.send(`Successfully updated.`);
            });
        }
    });
};
exports.reportNormal = reportNormal;
//# sourceMappingURL=report.js.map