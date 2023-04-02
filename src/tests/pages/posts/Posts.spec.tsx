import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Posts, { getStaticProps } from "@/src/pages/posts";
import { getPrismicClient } from "@/src/services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "my-new-post title",
    excerpt: "my-new-post",
    updatedAt: "march 10",
  },
];

jest.mock("../../../services/prismic");

describe("Posts page", () => {
  it("render correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("my-new-post title")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-slug",
            data: {
              title: [
                {
                  type: "heading",
                  text: "Fake title 1",
                },
              ],
              content: [
                {
                  type: "paragraph",
                  text: "Fake excerpt 1",
                },
              ],
            },
            last_publication_date: "01-01-2020",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});
    // console.log(response)
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: [
                {
                  type: "heading",
                  text: "Fake title 1",
                },
              ],
              excerpt: "Fake excerpt 1",
              updatedAt: "01 de janeiro de 2020",
            },
          ],
        },
      })
    );
  });
});
