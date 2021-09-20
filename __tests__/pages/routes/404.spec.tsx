import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import NotFoundPage from "@/pages/404";

describe("404 page", () => {
    afterEach(cleanup)

    it("should render correctly", () => {
        expect(() => render(<NotFoundPage />)).not.toThrow();
    });

    it("should render some boilersheet info", async () => {
        render(<NotFoundPage />);
        const title = await screen.findByText("Page Not Found");
        const text = title.nextElementSibling!;
        expect(text.textContent)
            .toEqual("Unfortunately, the page you were looking for doesn't exist. I suggest you find a link that better suits you from the left hand side. Or you can just visit the home page by clicking here.")
        expect(text.firstElementChild!.textContent).toEqual("home page by clicking here")
        expect(text.firstElementChild!.getAttribute('href')).toEqual("/")
    });
});
