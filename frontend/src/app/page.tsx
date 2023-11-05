import styles from "./page.module.css";
import { Metadata } from "next";
import Navigation from "@/app/navigation";

export const metadata: Metadata = {
    title: "Home | Manhole Watchdog",
};

export default function Home() {
    return (
        <main className={styles.main}>
            <br></br>
            <div className={styles["button-container"]}>
                <img title="Logo" className={styles.logo} src="/logo.png" alt="Manhole Watchdog" />
                <h1 className={styles.heading}>Manhole Watchdog</h1>
                <Navigation isHome={true} />
            </div>
        </main>
    );
}
