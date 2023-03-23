import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";

import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  const useSessionMocked = mocked(useSession);
  it("render correctly when user is not authenticated", () => {
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("render correctly when user is authenticated", () => {
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
    } as any);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
