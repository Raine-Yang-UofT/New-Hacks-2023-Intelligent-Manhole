import styles from "./page.module.css";
import { Metadata } from "next";
import Navigation from "@/app/navigation";

export const metadata: Metadata = {
    title: "FAQs | Manhole Watchdog",
};

export default function Faq() {
    return (
        <>
            <p>&nbsp;</p>
            <Navigation />
            <div>
                <div>
                    <h3 className={styles.title}><strong>What is the purpose of this
                        project?</strong>
                    </h3>
                    <p className={styles.content}>The purpose of this project is to
                        create a system
                        where we can monitor manholes all across the city, including their displacement, tilt, and status of the
                        manholes.</p>
                </div>
                <div>
                    <h3 className={styles.title}><strong>How is it useful?</strong>
                    </h3>
                    <p className={styles.content}>It is useful since it can detect
                        movement of these manholes so that it can alert the website if any alarming activities were to happen.</p>
                </div>
                <div>
                    <h3 className={styles.title}><strong>How was this created?</strong>
                    </h3>
                    <p className={styles.content}>&nbsp;</p>
                </div>
                <div>
                    <h3 className={styles.title}><strong>How does this relate to Smart
                        Cities?</strong>
                    </h3>
                    <p className={styles.content}>This relates to Smart Cities since
                        this device can
                        be used to solve an issue in the city. Take Toronto for example, there are a lot of construction going on
                        everywhere, and with this device, we can ensure the safety of everyone.</p>
                </div>
            </div>
        </>
    );
}
