import { RequestHandler } from "express";
import { connection } from "./index";

// /report/:manhole_id
const report: RequestHandler = async function (req, res) {
    const { body, params } = req;
    const manhole_id = params.manhole_id;
    let sqlQuery = `
    INSERT INTO Events ( 
        manhole_id, 
        data
    )
    VALUES (
        "${manhole_id}", 
        '${JSON.stringify(body)}'
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
                    else res.send(`Successfully updated: ${sqlQuery}`);
                },
            );
        }
    });
};

export default report;
