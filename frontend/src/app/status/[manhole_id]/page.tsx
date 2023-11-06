import { getManholeEventsByManholeId, getManholeStatus } from "@/api";
import Map from "./map";
import Navigation from "@/app/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";
import SetToNormal from "./setToNormal";

export const metadata: Metadata = {
    title: "Manhole Status | Manhole Watchdog",
}

export default async function ManholeStatus({ params: { manhole_id } }: { params: { manhole_id: string } }) {
    const { latitude, longitude, status } = await getManholeStatus(manhole_id);
    const events = (await getManholeEventsByManholeId(manhole_id)).sort((a, b) => (new Date(a.time)).getTime() - (new Date(b.time)).getTime());
   return (
        <>
            <p>&nbsp;</p>
            <Navigation />
            <div className={styles.row}>
                <div className={styles["status-column"]}>
                    <h2>Manhole ID: <span id="manhole-id">{manhole_id}</span></h2>
                    <h3>Status: <span id="status" style={status == "alarm" ? { color: "red" } : {}}>{status}</span></h3>
                    <Map longitude={longitude} latitude={latitude} />
                    {status === "alarm" ? <SetToNormal manhole_id={manhole_id} /> : <></>}
                </div>
                <div className={styles["event-column"]}>
                    <table>
                        <tr>
                            <th className={styles["table-column-event-id"]}>Event Id</th>
                            <th className={styles["table-column-time"]} > Time</th>
                            <th className={styles["table-column-data"]} > Data</th>
                        </tr>
                        <tr></tr>
                        {events.length !== 0 ? events.map(event => <tr>
                            <td> <Link href={`/events/${event.event_id}`}> {event.event_id} </Link> </td>
                            <td> {new Date(event.time).toLocaleString()} </td>
                            <td> <Link href={`/events/${event.event_id}/data`}> Raw Data </Link> </td>
                        </tr>) : <tr><td>No Events Available</td></tr>}
                    </table>
                </div >
            </div >
        </>
    )
}
