"use client"
import { SensorData } from "@/types";
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react";
import { Mesh } from "three";

const pollrate = 5;
const delta_time = 1 / pollrate;

export interface AnimationProps {
    data: SensorData[];
}

type Tilt = {
    x: number;
    y: number;
    z: number;
}

type Displacement = {
    x: number;
    y: number;
    z: number
}

function Manhole({ data }: AnimationProps) {
    const ref = useRef<Mesh>(null!);
    let tilt_sum: Tilt[] = [{ x: 0, y: 0, z: 0 }];
    let displacement_sum: Displacement[] = [{ x: 0, y: 0, z: 0 }];
    for (let i = 0; i < data.length; i++) {
        tilt_sum.push({
            x: tilt_sum[i].x + data[i].tilt_x * delta_time,
            y: tilt_sum[i].y + data[i].tilt_y * delta_time,
            z: tilt_sum[i].z + data[i].tilt_z * delta_time,
        })
        displacement_sum.push({
            x: displacement_sum[i].x + data[i].displacement_x * delta_time,
            y: displacement_sum[i].y + data[i].displacement_y * delta_time,
            z: displacement_sum[i].z + data[i].displacement_z * delta_time,
        })
    }

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const time_section = Math.floor(time / delta_time);
        if (time_section >= data.length) {
            clock.start();
            return;
        }
        const remain_time = time - delta_time * time_section;
        let tilt = {
            x: tilt_sum[time_section].x + remain_time * data[time_section].tilt_x,
            y: tilt_sum[time_section].y + remain_time * data[time_section].tilt_y,
            z: tilt_sum[time_section].z + remain_time * data[time_section].tilt_z,
        };
        let displacement = {
            x: displacement_sum[time_section].x + remain_time * data[time_section].displacement_x,
            y: displacement_sum[time_section].y + remain_time * data[time_section].displacement_y,
            z: displacement_sum[time_section].z + remain_time * data[time_section].displacement_z,
        };

        ref.current.rotation.x = tilt.x;
        ref.current.rotation.y = tilt.y;
        ref.current.rotation.z = tilt.z;
        ref.current.position.x = displacement.x;
        ref.current.position.y = displacement.y;
        ref.current.position.z = displacement.z;
    })
    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[
                2,
                2,
                0.2,
                32,
                32,
                false,
                0,
                2 * Math.PI
            ]} />
            <meshBasicMaterial color="grey" />
        </mesh>
    )
}

export default function ManholeAnimation({ data }: AnimationProps) {

    return (
        <div style={{ width: "50", height: "100vh" }}>
            <Canvas camera={{ position: [0, 0, 5] }} style={{ background: "#ffffff", width: "50vw", height: "50vh", marginLeft: "auto", marginRight: "auto" }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />
                <Manhole data={data} />
            </Canvas>
        </div>
    )
}
