"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsByManholeId = exports.eventsById = exports.events = void 0;
const index_1 = require("./index");
// /events
const events = async function (req, res) {
    let sqlQuery = `
    SELECT *
    FROM Events
    `;
    index_1.connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        }
        else {
            res.json(data.map((event) => {
                return { ...event, data: JSON.parse(event.data) };
            }));
        }
    });
};
exports.events = events;
// /eventsByManholeId/:manhole_id
const eventsByManholeId = async function (req, res) {
    const { params } = req;
    const id = params.manhole_id;
    let sqlQuery = `
    SELECT *
    FROM Events
    WHERE manhole_id="${id}"
    `;
    index_1.connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        }
        else {
            res.json(data.map((event) => {
                return { ...event, data: JSON.parse(event.data) };
            }));
        }
    });
};
exports.eventsByManholeId = eventsByManholeId;
// /events/:event_id
const eventsById = async function (req, res) {
    const { params } = req;
    const id = params.event_id;
    let sqlQuery = `
    SELECT *
    FROM Events
    WHERE event_id="${id}"
    `;
    index_1.connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        }
        else {
            res.json({ ...data[0], data: JSON.parse(data[0].data) });
        }
    });
};
exports.eventsById = eventsById;
//# sourceMappingURL=events.js.map