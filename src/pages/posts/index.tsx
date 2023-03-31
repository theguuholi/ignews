import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss"

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | IgNews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <Link href="/">
                        <time>2 de marco</time>
                        <strong>Blac</strong>
                        <p>sadfasdf</p>
                    </Link>

                    <Link href="/">
                        <time>2 de marco</time>
                        <strong>Blac</strong>
                        <p>sadfasdf</p>
                    </Link>

                    <Link href="/">
                        <time>2 de marco</time>
                        <strong>Blac</strong>
                        <p>sadfasdf</p>
                    </Link>
                </div>
            </main>
        </>
    )
}