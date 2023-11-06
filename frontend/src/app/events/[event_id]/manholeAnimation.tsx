"use client"
import { SensorData } from "@/types";
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react";
import { Mesh } from "three";

const pollrate = 20;
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
    let gyro_sum: Tilt[] = [{ x: 0, y: 0, z: 0 }];
    let displacement_sum: Displacement[] = [{ x: 0, y: 0, z: 0 }];
    for (let i = 0; i < data.length; i++) {
        gyro_sum.push({
            x: gyro_sum[i].x + data[i].gyro.x * delta_time,
            y: gyro_sum[i].y + data[i].gyro.y * delta_time,
            z: gyro_sum[i].z + data[i].gyro.z * delta_time,
        })
        displacement_sum.push({
            x: displacement_sum[i].x + data[i].acceleration.x * delta_time,
            y: displacement_sum[i].y + data[i].acceleration.y * delta_time,
            z: displacement_sum[i].z + data[i].acceleration.z * delta_time,
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
        let gyro = {
            x: gyro_sum[time_section].x + remain_time * data[time_section].gyro.x,
            y: gyro_sum[time_section].y + remain_time * data[time_section].gyro.y,
            z: gyro_sum[time_section].z + remain_time * data[time_section].gyro.z,
        };
        let displacement = {
            x: displacement_sum[time_section].x + remain_time * data[time_section].acceleration.x,
            y: displacement_sum[time_section].y + remain_time * data[time_section].acceleration.y,
            z: displacement_sum[time_section].z + remain_time * data[time_section].acceleration.z,
        };

        ref.current.rotation.x = gyro.x;
        ref.current.rotation.y = gyro.y;
        ref.current.rotation.z = gyro.z;
        ref.current.position.x = displacement.x;
        ref.current.position.y = displacement.y;
        ref.current.position.z = displacement.z;
    })
    return (
        <mesh ref={ref}>
            <cylinderGeometry args={[
                1,
                1,
                0.1,
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
        <div style={{ width: "50vw", height: "100vh" }}>
            <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "50vw", height: "50vh", marginLeft: "auto", marginRight: "auto" }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} castShadow />
                <Manhole data={data} />
            </Canvas>
        </div>
    )
}
