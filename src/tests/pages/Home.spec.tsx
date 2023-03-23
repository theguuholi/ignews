import Home from "../../pages/index";
import { render, screen } from "@testing-library/react";

jest.mock("next/router")
jest.mock("next-auth/react",  () => {
    return {
        userSession: () => [null, false]
    }
})

describe("Home page", () => {
    it("render correctly", () => {
  
      render(<Home product={
        {
            priceId: "13131",
            amount: "$10"
        }
      } />);
  
      expect(screen.getByText("$10")).toBeInTheDocument();
    });
})