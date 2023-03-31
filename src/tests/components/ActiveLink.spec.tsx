
import { ActiveLink } from "@/src/componens/ActiveLink";
import { render } from "@testing-library/react";


jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Active Link component", () => {
  test("active link renders correctly", () => {
    //   const { _debug, getByText } =
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">Home</ActiveLink>
    );

    //   debug();
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">Home</ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
