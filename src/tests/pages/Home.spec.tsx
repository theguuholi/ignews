import Home from "../../pages/index";
import { render, screen } from "@testing-library/react";

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
});
