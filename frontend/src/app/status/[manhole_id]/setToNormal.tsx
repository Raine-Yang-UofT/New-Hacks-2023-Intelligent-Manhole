"use client"
import { setManholeNormal } from "@/api"
import styles from "./setToNormal.module.css"
import { useRouter } from "next/navigation";

export interface SetToNormalProps {
    manhole_id: string;
}

export default function SetToNormal({ manhole_id }: SetToNormalProps) {
    const router = useRouter();
    async function onClick() {
        await setManholeNormal(manhole_id);
        router.refresh();
    }
    return (
        <div className={styles["button-container"]}>
            <button title="Set to Normal" className={styles.button} onClick={onClick}>SET TO NORMAL</button>
        </div>
    )
}
