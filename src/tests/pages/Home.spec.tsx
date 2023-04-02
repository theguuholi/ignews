import { mock } from "node:test";
import Home, { getStaticProps } from "../../pages/index";
import { render, screen } from "@testing-library/react";
import { stripe } from "@/src/services/stripe";
import { mocked } from "jest-mock";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});
jest.mock("next-auth/react", () => {
  return { useSession: () => [null, false] };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("render correctly", () => {
    render(
      <Home
        product={{
          priceId: "13131",
          amount: "$10",
        }}
      />
    );

    expect(screen.getByText("for $10 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve);

    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1300,
    } as any);

    const response = await getStaticProps({});
    // console.log(response)
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$13.00",
          },
        },
      })
    );
  });
});
