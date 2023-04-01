import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { SubscribeButton } from "@/src/componens/SubscribeButton";
import { useRouter } from "next/router";

jest.mock("next-auth/react");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("SubscribeButton component", () => {
  it("render correctly", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    useRouterMocked.mockReturnValueOnce({
      push: jest.fn(),
    } as any);
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now!")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        activeSubscription: "23123",
        expires: "fake-expires",
      },
    } as any);

      useRouterMocked.mockImplementationOnce(() => ({ push: pushMock } as any));

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now!");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
  });

  //   it("redirescts to post when user has already subscription", () => {
  //     const useRouterMocked = mocked(useRouter);
  //     const useSessionMocked = mocked(useSession);
  //     const pushMock = jest.fn();

  //     useSessionMocked.mockReturnValueOnce({
  //       data: {
  //         user: { name: "John Doe", email: "john.doe@example.com" },
  //         activeSubscription: "23123",
  //         expires: "fake-expires",
  //       },
  //     } as any);

  //     // useRouterMocked.mockRejectedValueOnce({
  //     //   push: pushMock,
  //     // } as any);

  //     useRouterMocked.mockImplementationOnce(() => ({ push: pushMock } as any));

  //     const subscribeButton = screen.getByText("Subscribe now!");
  //     fireEvent.click(subscribeButton);

  //     expect(pushMock).toHaveBeenCalledWith("/posts");
  //   });
});
