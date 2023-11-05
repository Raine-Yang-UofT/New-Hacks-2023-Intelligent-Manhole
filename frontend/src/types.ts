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

export interface SensorTilt {
    x: number;
    y: number;
    z: number;
}

// export interface SensorData {
//     acceleration: SensorAcceleration;
//     tilt: SensorTilt;
// }

export interface SensorData {
    displacement_x: number;
    displacement_y: number;
    displacement_z: number;
    tilt_x: number;
    tilt_y: number;
    tilt_z: number;
}

export interface ManholeEvent {
    event_id: string;
    manhole_id: string;
    time: string;
    data: SensorData[];
}
