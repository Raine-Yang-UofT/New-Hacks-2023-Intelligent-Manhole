"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const config_json_1 = __importDefault(require("../../config.json"));
const status_1 = require("./status");
const report_1 = require("./report");
const events_1 = require("./events");
const connection = mysql_1.default.createConnection({ ...config_json_1.default.database, timezone: "-04:00" });
exports.connection = connection;
const router = express_1.default.Router();
router.get("/status", status_1.status);
router.get("/status/:manhole_id", status_1.statusWithId);
router.post("/report/:manhole_id", report_1.report);
router.post("/reportNormal/:manhole_id", report_1.reportNormal);
router.get("/events", events_1.events);
router.get("/events/:event_id", events_1.eventsById);
router.get("/eventsByManholeId/:manhole_id", events_1.eventsByManholeId);
exports.default = router;
//# sourceMappingURL=index.js.map