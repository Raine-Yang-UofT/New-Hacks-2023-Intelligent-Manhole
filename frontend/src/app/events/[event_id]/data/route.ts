import { getManholeEventsByEventId } from "@/api";
import { Metadata } from "next";

export async function GET(request: Request, { params: { event_id } }: { params: { event_id: string } }) {
    const { data } = await getManholeEventsByEventId(event_id);
    return Response.json(data);
}
