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
	    {data.length >= 10 ?
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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}>
                    <h2>Event Id: {event_id}</h2>
                    <h3>Manhole Id: <Link href={`/status/${manhole_id}`}> {manhole_id} </Link></h3>
                    <h3>Time: {new Date(time).toLocaleString()} </h3>
                    <h3><Link href={`/events/${event_id}/data`}> Raw Data </Link></h3>
                </div >

            }
        </>
    )
}
