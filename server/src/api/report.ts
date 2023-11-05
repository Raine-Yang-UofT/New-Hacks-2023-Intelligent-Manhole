import { RequestHandler } from "express";
import { connection } from "./index";

const G = 9.80665;
// /report/:manhole_id
const report: RequestHandler = async function (req, res) {
    const { body, params } = req;
    const manhole_id = params.manhole_id;
    const data = body.map((sensor_data: number[]) => {
        return {
            acceleration: {
                x: sensor_data[0] * G,
                y: sensor_data[1] * G,
                z: sensor_data[2] * G,
            },
            gyro: {
                x: (sensor_data[3] / 180.0) * Math.PI,
                y: (sensor_data[4] / 180.0) * Math.PI,
                z: (sensor_data[5] / 180.0) * Math.PI,
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
    connection.query(sqlQuery, (err, _) => {
        if (err) res.send(err);
        else {
            connection.query(
                `
            UPDATE Manhole
            SET status="alarm"
            WHERE manhole_id="${manhole_id}"`,
                (err, _) => {
                    if (err) res.send(err);
                    else res.send(`Successfully updated.`);
                },
            );
        }
    });
};

const reportNormal: RequestHandler = async function (req, res) {
    const { params } = req;
    const manhole_id = params.manhole_id;
    let sqlQuery = `
    UPDATE Manhole
    SET status="normal"
    WHERE manhole_id="${manhole_id}"
    `;
    connection.query(sqlQuery, (err, _) => {
        if (err) res.send(err);
        else {
            connection.query(
                `
                DELETE FROM Events
                WHERE manhole_id="${manhole_id}";
            `,
                (err, _) => {
                    if (err) res.send(err);
                    else res.send(`Successfully updated.`);
                },
            );
        }
    });
};
export { report, reportNormal };
