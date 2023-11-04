import { RequestHandler } from "express";
import { connection } from "./index";

interface Event {
    event_id: string;
    manhole_id: string;
    time: string;
    data: string;
}

// /events
const events: RequestHandler = async function (req, res) {
    const { query } = req;
    let condition = "";
    if (query.status) condition = `status="${query.status}"`;
    let sqlQuery = `
    SELECT *
    FROM Events
    `;
    if (condition) sqlQuery += `WHERE ${condition}`;
    connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        } else {
            res.json(
                data.map((event: Event) => {
                    return { ...event, data: JSON.parse(event.data) };
                }),
            );
        }
    });
};

// /events/:manhole_id
const eventsWithId: RequestHandler = async function (req, res) {
    const { params } = req;
    const id = params.manhole_id;
    let sqlQuery = `
    SELECT *
    FROM Events
    WHERE manhole_id="${id}"
    `;
    connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json([]);
        } else {
            res.json(
                data.map((event: Event) => {
                    return { ...event, data: JSON.parse(event.data) };
                }),
            );
        }
    });
};

export { events, eventsWithId };
