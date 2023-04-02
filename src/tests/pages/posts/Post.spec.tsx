import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Post, { getServerSideProps } from "@/src/pages/posts/[slug]";
import { getSession } from "next-auth/react";
import { getPrismicClient } from "@/src/services/prismic";

const post = {
  slug: "my-new-post",
  title: "my-new-post title",
  content: "<h1>Post Content</h1>",
  updatedAt: "march 10",
};

jest.mock("next-auth/react");
jest.mock("../../../services/prismic");

describe("Post page", () => {
  it("render correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("my-new-post title")).toBeInTheDocument();
    expect(screen.getByText("Post Content")).toBeInTheDocument();
  });

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockReturnValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        }),
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "04-01-2021",
      }),
    } as any);

    getSessionMocked.mockReturnValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: [
              {
                text: "My new post",
                type: "heading",
              },
            ],
            content: "<p>Post content</p>",
            updatedAt: "01 de abril de 2021",
          },
        },
      })
    );
  });
});
