import Image from "next/image";
import Link from "next/link";
import styles from "./navigation.module.css";

export interface NavigationProps {
    isHome?: boolean
}

export default function Navigation(props: NavigationProps = { isHome: false }) {
    const { isHome } = props;
    return (
        <div className={styles["button-container"]}>
            {!isHome &&
                <Link title="Home" href="/">
                    <Image src="/logo.png" alt="Logo" width="100" height="100" />
                </Link>
            }
            <Link title="Dashboard" className={styles.button} href="/dashboard">DASHBOARD</Link>
            <Link title="About us" className={styles.button} href="/about">ABOUT US</Link>
            <Link title="FAQs" className={styles.button} href="/faq">FAQS</Link>
        </div>
    )
}
