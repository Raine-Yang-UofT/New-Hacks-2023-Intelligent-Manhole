"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusWithId = exports.status = void 0;
const index_1 = require("./index");
// /status?status="normal" or "alarm"
const status = async function (req, res) {
    const { query } = req;
    let condition = "";
    if (query.status)
        condition = `status="${query.status}"`;
    let sqlQuery = `
    SELECT *
    FROM Manhole
    `;
    if (condition)
        sqlQuery += `WHERE ${condition}`;
    index_1.connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        }
        else {
            res.json(data);
        }
    });
};
exports.status = status;
// /status/:manhole_id
const statusWithId = async function (req, res) {
    const { params } = req;
    const id = params.manhole_id;
    let sqlQuery = `
    SELECT *
    FROM Manhole
    WHERE manhole_id="${id}"
    `;
    index_1.connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.statusWithId = statusWithId;
//# sourceMappingURL=status.js.map