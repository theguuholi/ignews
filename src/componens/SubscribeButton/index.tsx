import { api } from "../../services/api";
import { getStripeJs } from "@/src/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

// lugares seguros getServerSideProps (SSR), getStatisProps(SSSG) API ROUTEs
export function SubscribeButton() {
  const session = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (session.status === "unauthenticated") {
      signIn("github");
      return;
    } else {
      if (session.data.activeSubscription) {
        router.push("/posts");
        return;
      } else {
        try {
          const response = await api.post("/subscribe");
          const { sessionId } = response.data;
          const stripe = await getStripeJs();
          await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now!
    </button>
  );
}
