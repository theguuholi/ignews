import { api } from "../../services/api";
import { getStripeJs } from "@/src/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps{
    priceId: string
}

// lugares seguros getServerSideProps (SSR), getStatisProps(SSSG) API ROUTEs
export function SubscribeButton({priceId} : SubscribeButtonProps) {
    const session = useSession()

    async function handleSubscribe(){

        if(!session){
            signIn("github")
            return;
        }

        try {
            const response = await api.post("/subscribe")
            const {sessionId} = response.data
            const stripe =  await getStripeJs()
            await stripe.redirectToCheckout({sessionId})
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
            Subscribe now!
        </button>
    );
}