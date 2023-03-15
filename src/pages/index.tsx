import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../componens/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

// client-side, server-side, static-side-generation
// post blog > ssg, comentarios client-side
// FaunaDB - HTTP
// Postgres, MongoDb - conexao
interface HomeProps {
  product: {
    priceId: string;
    amount: number
  }
}

export default function Home({product} : HomeProps) {
  console.log(product)
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get Access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

// export const getServerSideProps : GetServerSideProps = async () => {
export const getStaticProps : GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1MltenFrkHcGdHmpqwvhIZkH", {
    expand: ["product"]
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price.unit_amount / 100)

  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // 24hours
  }
}