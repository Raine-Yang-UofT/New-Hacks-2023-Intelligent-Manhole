import Link from "next/link";
import styles from "./manholeItem.module.css"

export interface ManholeItemProps {
    manholeId: string;
}

export default function ManholeItem(props: ManholeItemProps) {
    const { manholeId } = props;
    return (
        <div className={styles["circle-container"]}>
            <div className={styles["black-circle"]}></div>
            <Link title={manholeId} href={`/status/${manholeId}`} className={styles["circle-button-parent"]}>
                <button className={styles["circle-button"]}>
                    <h1>{manholeId}</h1>
                </button>
            </Link>
        </div >
    );
}
