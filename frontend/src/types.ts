export interface ManholeStatus {
    manhole_id: string;
    longitude: number;
    latitude: number;
    status: "normal" | "alarm";
}

export interface SensorAcceleration {
    x: number;
    y: number;
    z: number;
}

export interface SensorGyro {
    x: number;
    y: number;
    z: number;
}

export interface SensorData {
    acceleration: SensorAcceleration;
    gyro: SensorGyro;
}

export interface ManholeEvent {
    event_id: string;
    manhole_id: string;
    time: string;
    data: SensorData[];
}
