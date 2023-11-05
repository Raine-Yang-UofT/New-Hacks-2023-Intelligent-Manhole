import { getManholeEventsByEventId } from "@/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manhole Event | Manhole Watchdog",
};

export async function GET(request: Request, { params: { event_id } }: { params: { event_id: string } }) {
    const { data } = await getManholeEventsByEventId(event_id);
    return Response.json(data);
}
