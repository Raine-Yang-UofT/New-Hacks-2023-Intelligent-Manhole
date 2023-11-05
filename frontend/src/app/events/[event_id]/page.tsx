import { getManholeEventsByEventId } from "@/api";
import Navigation from "@/app/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import ManholeAnimation from "./manholeAnimation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manhole Event | Manhole Watchdog",
}

export default async function ManholeEvents({ params: { event_id } }: { params: { event_id: string } }) {
    const { time, manhole_id, data } = await getManholeEventsByEventId(event_id);
    return (
        <>
            <Navigation />
            {data.length >= 100 ?
                <div className={styles.row}>
                    <div className={styles["event-column"]}>
                        <h2>Event Id: {event_id}</h2>
                        <h3>Manhole Id: <Link href={`/status/${manhole_id}`}> {manhole_id} </Link></h3>
                        <h3>Time: {new Date(time).toLocaleString()} </h3>
                    </div>
                    <div className={styles["animation-column"]}>
                        <ManholeAnimation data={data} />
                    </div>
                </div> :
                <table style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <tr>
                        <th className={styles["table-column-event-id"]}>Event Id</th>
                        <th className={styles["table-column-manhole-id"]}>Manhole Id</th>
                        <th className={styles["table-column-time"]}>Time</th>
                    </tr>
                    <tr>
                        <td className={styles["table-column-event-id"]}>{event_id}</td>
                        <td className={styles["table-column-manhole-id"]}><Link href={`/status/${manhole_id}`}> {manhole_id} </Link></td>
                        <td className={styles["table-column-time"]}>{new Date(time).toLocaleString()} </td>
                    </tr>
                </table>

            }
        </>
    )
}
