import express from "express";
import mysql from "mysql";
import config from "../../config.json";

import { status, statusWithId } from "./status";
import { report, reportNormal } from "./report";
import { events, eventsWithId } from "./events";

const connection = mysql.createConnection({ ...config.database, timezone: "-04:00" });

const router = express.Router();

router.get("/status", status);
router.get("/status/:manhole_id", statusWithId);

router.post("/report/:manhole_id", report);
router.post("/reportNormal/:manhole_id", reportNormal);

router.get("/events", events);
router.get("/events/:manhole_id", eventsWithId);

export default router;

export { connection };
