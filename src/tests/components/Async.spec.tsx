import { Async } from "@/src/componens/Async";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";


test("it renders correctly", async () => {
    render(<Async />)
    expect(screen.getByText("Hello!")).toBeInTheDocument()

    // screen.logTestingPlaygroundURL()
    // expect(await screen.findByText("Visible")).toBeInTheDocument()
    // await waitFor(() => {
    //     return expect(screen.getByText("Visible")).toBeInTheDocument()
    // })

        await waitForElementToBeRemoved(screen.queryByText("Button"))

    //         await waitFor(() => {
    //     return expect(screen.getByText("Visible")).toBeInTheDocument()
    // })
})