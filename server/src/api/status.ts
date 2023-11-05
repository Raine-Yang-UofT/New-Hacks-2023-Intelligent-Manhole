import { RequestHandler } from "express";
import { connection } from "./index";

// /status?status="normal" or "alarm"
const status: RequestHandler = async function (req, res) {
    const { query } = req;
    let condition = "";
    if (query.status) condition = `status="${query.status}"`;
    let sqlQuery = `
    SELECT *
    FROM Manhole
    `;
    if (condition) sqlQuery += `WHERE ${condition}`;
    connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        } else {
            res.json(data);
        }
    });
};

// /status/:manhole_id
const statusWithId: RequestHandler = async function (req, res) {
    const { params } = req;
    const id = params.manhole_id;
    let sqlQuery = `
    SELECT *
    FROM Manhole
    WHERE manhole_id="${id}"
    `;
    connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        } else {
            res.json(data[0]);
        }
    });
};

export { status, statusWithId };
