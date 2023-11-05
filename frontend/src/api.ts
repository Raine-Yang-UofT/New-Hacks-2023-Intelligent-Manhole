import { ManholeStatus, ManholeEvent } from "@/types";
import { notFound } from "next/navigation";

const API_ROOT = "http://34.71.38.254:5000/api";

export async function getAllManholeStatus(): Promise<ManholeStatus[]> {
    const result = await fetch(API_ROOT + "/status", { cache: "no-store" });
    if (!result.ok) {
        throw Error(`Error occured when getting all manhole status`);
    }
    return result.json();
}

export async function getManholeStatus(manhole_id: string): Promise<ManholeStatus> {
    const result = await fetch(API_ROOT + `/status/${manhole_id}`, { cache: "no-store" });
    if (!result.ok) {
        throw Error(`Error occured when getting status for ${manhole_id}`);
    }
    return result.json();
}

export async function getAllManholeEvents(): Promise<ManholeEvent[]> {
    const result = await fetch(API_ROOT + "/events", { cache: "no-store" });
    if (!result.ok) {
        throw Error(`Error occured when getting all manhole events`);
    }
    return result.json();
}

export async function getManholeEventsByManholeId(manhole_id: string): Promise<ManholeEvent[]> {
    const result = await fetch(API_ROOT + `/eventsByManholeId/${manhole_id}`, { cache: "no-store" });
    if (!result.ok) {
        throw Error(`Error occured when getting events for ${manhole_id}`);
    }
    return result.json();
}

export async function getManholeEventsByEventId(event_id: string): Promise<ManholeEvent> {
    const result = await fetch(API_ROOT + `/events/${event_id}`, { cache: "no-store" });
    if (!result.ok) {
        throw Error(`Error occured when getting event ${event_id}`);
    }
    return result.json();
}
