import { render } from "@testing-library/react";
import { ActiveLink } from ".";

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
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    //   debug();
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently", () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toHaveClass("active");
  });
});
