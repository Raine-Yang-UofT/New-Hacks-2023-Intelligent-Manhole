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
                    <p> I am Chuyi Wang and I am currently a first-year Computer Science student in University of Toronto.</p>
                    <br />
                    <p> In charge of backend design and frontend programming logic</p>
                </div>
                <div className={styles["column-center"]}>
                    <h1> Raine Yang </h1>
                    <br />
                    <p> I am Raine Yang and I am currently a first-year Computer Science student in University of Toronto.</p>
                    <br />
                    <p> In charge of sensor programming.</p>
                </div>
                <div className={styles["column-center"]}>
                    <h1>Raisa Kayastha</h1>
                    <br />
                    <p>Hi! I'm Raisa Kayastha, currently a second year CS student at the University of Western Ontario. I worked on front-end for this project alongside Kenda to create the website.</p>
                </div>
                <div className={styles["column-right"]}>
                    <h1>Kenda Najjar</h1>
                    <br />
                    <p>Hello! My name is Kenda Najjar and I am currently a second year CS student at the Univeristy of Western Ontario. I was in charge of making the frontend for this project with Raisa.</p>
                </div>

            </div>
        </>
    )
}
