import { fauna } from "@/src/services/fauna";
import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  jwt: {
    signingKey: process.env.SIGNIN_KEY,
  },
  secret: process.env.SIGNIN_KEY,
  callbacks: {
    async session({ session }) {
      const user = await fauna.query(
        q.Get(
          q.Match(q.Index("users_by_email"), q.Casefold(session.user.email))
        )
      );

      if (user.data.stripe_customer_id) {
        try {
          const userActiveSubscription = await fauna.query(
            q.Get(
              q.Intersection([
                q.Match(
                  q.Index("subscription_by_user_ref"),
                  q.Select(
                    "ref",
                    q.Get(
                      q.Match(
                        q.Index("users_by_email"),
                        q.Casefold(user.data.email)
                      )
                    )
                  )
                ),
                q.Match(
                  q.Index("subscription_by_status"),
                  q.Casefold("active")
                ),
              ])
            )
          );

          return {
            ...session,
            activeSubscription: userActiveSubscription,
          };
        } catch (error) {
          return {
            ...session,
            activeSubscription: null,
          };
        }
      } else {
        return {
          ...session,
          activeSubscription: null,
        };
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        const r = await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("users_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create("users", { data: { email } }),
            q.Get(q.Match(q.Index("users_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
