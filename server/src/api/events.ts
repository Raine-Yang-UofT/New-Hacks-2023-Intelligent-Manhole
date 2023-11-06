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
    let sqlQuery = `
    SELECT *
    FROM Events
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

// /eventsByManholeId/:manhole_id
const eventsByManholeId: RequestHandler = async function (req, res) {
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

// /events/:event_id
const eventsById: RequestHandler = async function (req, res) {
    const { params } = req;
    const id = params.event_id;
    let sqlQuery = `
    SELECT *
    FROM Events
    WHERE event_id="${id}"
    `;
    connection.query(sqlQuery, (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            res.json({});
        } else {
            res.json({ ...data[0], data: JSON.parse(data[0].data) });
        }
    });
};

export { events, eventsById, eventsByManholeId };
