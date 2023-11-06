import { getAllManholeStatus } from "@/api";
import Navigation from "@/app/navigation";
import { Metadata } from "next";
import ManholeMap from "./manholeMap";

export const metadata: Metadata = {
    title: "Dashboard | Manhole Watchdog",
}

export default async function Dashboard() {
    const statuses = await getAllManholeStatus();
    console.log(statuses);

    return (<>
        <p>&nbsp;</p>
        <Navigation />
        <ManholeMap data={statuses} />
    </>)
}
