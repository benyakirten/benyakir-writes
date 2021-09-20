import * as React from "react";
import {
    cleanup,
    render,
    screen,
    act,
    fireEvent,
    waitFor,
} from "@testing-library/react";

import ContactPage from "@/pages/contact";

describe("contact page", () => {
    (global as any).fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => ({ test: "test" }),
        })
    );

    jest.mock("gatsby");

    beforeEach(() => {
        (fetch as any).mockClear();
    });

    afterEach(() => {
        cleanup();
    });

    it("should render correctly", () => {
        expect(() => render(<ContactPage />)).not.toThrow();
    });

    it("should render a title and an adjacent paragraph", async () => {
        render(<ContactPage />);

        const title = await screen.findByText("Contact");
        expect(title).toBeTruthy();
        expect(title.tagName).toEqual("H1");

        const para = title.nextElementSibling;
        expect(para?.textContent).toEqual(
            "This form is a nice way to contact me. However, if it doesn't work, I urge you to either send me an email directly at ben@benyakiredits.com or send me a message through the contact page on my old blog."
        );
        expect(para?.children[0].getAttribute("href")).toEqual(
            "mailto:ben@benyakiredits.com"
        );
        expect(para?.children[1].getAttribute("href")).toEqual(
            "https://benyakiredits.com/about-me/contact"
        );
    });

    it("should render a contact form with two inputs and two labels and a button labelled submit that's disabled", async () => {
        render(<ContactPage />);
        const inputs = await screen.getAllByRole("textbox");
        expect(inputs.length).toEqual(2);

        expect(inputs[0].nextElementSibling?.textContent).toEqual("Email");
        expect(inputs[1].nextElementSibling?.textContent).toEqual("Message");

        const button = (await screen.getByText("Submit")).parentElement!;
        expect(button).toBeTruthy();
        expect(button.tagName).toBe("BUTTON");
        expect(button).toBeDisabled();
    });

    it("should enable and disable the button based on whether the inputs are valid", async () => {
        render(<ContactPage />);

        const [email, message] = await screen.getAllByRole("textbox");
        let button = await screen.getByRole("button");
        expect(button).toBeDisabled();

        await act(async () => {
            fireEvent.change(email, { target: { value: "a@a.com" } });
            fireEvent.change(message, { target: { value: "test message" } });
            await waitFor(() => expect(button).toBeEnabled());

            fireEvent.change(email, { target: { value: "a@a." } });
            fireEvent.change(message, { target: { value: "test message" } });
            await waitFor(() => expect(button).toBeDisabled());

            const longMessage = Array.from({ length: 100 }, () => "a\n");
            fireEvent.change(email, { target: { value: "test@test.co.uk" } });
            fireEvent.change(message, {
                target: {
                    value: `I want to write you a long missive ${longMessage}`,
                },
            });
            await waitFor(() => expect(button).toBeEnabled());

            fireEvent.change(email, { target: { value: "a@a.com" } });
            fireEvent.change(message, { target: { value: "" } });
            await waitFor(() => expect(button).toBeDisabled());
        });
    });

    it("should send a call to fetch with the pertinent details and render a success alertbox if the call goes successfully", async () => {
        render(<ContactPage />);

        const [email, message] = await screen.getAllByRole("textbox");
        let button = await screen.getByRole("button");
        expect(button).toBeDisabled();

        await act(async () => {
            fireEvent.change(email, { target: { value: "a@a.com" } });
            fireEvent.change(message, { target: { value: "test message" } });
            await waitFor(() => expect(button).toBeEnabled());

            fireEvent.click(button);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("/", {
                body: "email=a%40a.com&message=test%20message&form-name=Contact%20Form",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });

            const result = await waitFor(() => screen.findByText("Message sent successfully!"))
            expect(result).toBeTruthy()
            expect(result.tagName).toEqual("DIV")
        });
    });

    it('should render a div to announce an error if the fetch call goes unsuccessfully', async() => {
        (fetch as any).mockImplementationOnce(() => {
            Promise.resolve({
                ok: false
            })
        })
        render(<ContactPage />);

        const [email, message] = await screen.getAllByRole("textbox");
        let button = await screen.getByRole("button");
        expect(button).toBeDisabled();

        await act(async () => {
            fireEvent.change(email, { target: { value: "a@a.com" } });
            fireEvent.change(message, { target: { value: "test message" } });
            await waitFor(() => expect(button).toBeEnabled());

            fireEvent.click(button);

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("/", {
                body: "email=a%40a.com&message=test%20message&form-name=Contact%20Form",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "POST",
            });

            const result = await waitFor(() => screen.findByText("Unable to process form. Please try again later."))
            expect(result).toBeTruthy()
            expect(result.tagName).toEqual("DIV")
        });
    })
});
