import ManholeItem from "./manholeItem"
import { getAllManholeStatus } from "@/api";
import Navigation from "@/app/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Manhole Watchdog",
}

export default async function Dashboard() {
    const statuses = await getAllManholeStatus();
    console.log(statuses);

    return (<>
        <p>&nbsp;</p>
        <Navigation />
        <div>
            {statuses.map(status => <ManholeItem manholeId={status.manhole_id} />)}
        </div>
    </>)
}
