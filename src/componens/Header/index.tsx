import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "./SignInButton";
import styles from "./styles.module.scss";

export function Header(){
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src="/images/logo.svg" alt="ig.news" width={100} height={100} />
                <nav>
                    <Link href="/" className={styles.active}>Home</Link>
                    <Link href="/posts">Posts</Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}