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
                <table className={styles["faq-table"]}>
                    <tbody>
                        <tr className={styles["faq-table-row"]}>
                            <td className={styles["faq-table-cell"]}>Some Faq</td>
                            <td className={styles["faq-table-cell"]}>&nbsp;</td>
                            <td className={styles["faq-table-cell"]}>&nbsp;</td>
                            <td className={styles["faq-table-cell"]}>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
