import { Metadata } from "next";
import Navigation from "../navigation";
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "About | Manhole Watchdog",
}

export default function About() {
    return (
        <>
            <Navigation />
            <div className={styles.row}>
                <div className={styles["column-left"]}>
                    <h1> Chuyi Wang </h1>
                    <br />
                    <p> Experienced in frontend and backend programming.</p>
                    <br />
                    <p> In charge of backend design and frontend programming logic</p>
                </div>
                <div className={styles["column-center"]}>
                    <h1> Raine Yang </h1>
                    <br />
                    <p> Experienced in hardware.</p>
                    <br />
                    <p> In charge of sensor programming.</p>
                </div>
                <div className={styles["column-center"]}>
                    <h1> Chuyi Wang </h1>
                    <br />
                    <p> Experienced in frontend and backend programming.</p>
                    <br />
                    <p> In charge of backend design and frontend programming logic</p>
                </div>
                <div className={styles["column-right"]}>
                    <h1> Raine Yang </h1>
                    <br />
                    <p> Experienced in hardware.</p>
                    <br />
                    <p> In charge of sensor programming.</p>
                </div>

            </div>
        </>
    )
}
