import { api } from "@/src/services/api";
import { getStripeJs } from "@/src/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps{
    priceId: string
}

// lugares seguros getServerSideProps (SSR), getStatisProps(SSSG) API ROUTEs
export function SubscribeButton({priceId} : SubscribeButtonProps) {
    const session = useSession()

    function handleSubscribe(){

        if(!session){
            signIn("github")
            return;
        }

        try {
            const response = api.post("/subscribe")
            const {sessionId} = response
            const stripe =  getStripeJs()
            stripe.redirectToCheckout({sessionId})
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