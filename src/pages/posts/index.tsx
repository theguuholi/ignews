import { getPrismicClient } from "@/src/services/prismic";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "./styles.module.scss"
import Prismic from "@prismicio/client"


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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.predicates.at("document.type", "publication")
    ], {
        fetch: ["publication.title", "publication.content"],
        pageSize: 100
    })

    console.log(response)

    return {
        props: {}
    }
}