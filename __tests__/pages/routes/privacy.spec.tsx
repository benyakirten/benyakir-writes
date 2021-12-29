import * as React from "react";

import { cleanup, render, screen } from "@TestUtils";
import PrivacyPage from "@/pages/privacy";

describe("privacy page", () => {
  afterEach(cleanup);

  it("should render correctly", () => {
    expect(() => render(<PrivacyPage />)).not.toThrow();
  });

  it("should render a heading for the page", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Privacy Policy");
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual("H1");
  });

  it("should render a following paragrpah of text", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Privacy Policy");
    const para = title.nextElementSibling;
    expect(para?.tagName).toEqual("P");
    expect(para?.textContent).toEqual(
      "No personal data is collected from any website visitor. You can rest assurred your data will remain with you and will not be shared with anyone for any reason. Mostly because there isn't anything to share. Theme preferences, if set, will be stored in local storage, which is inaccessible to anyone outside of this browser when it visits this website. It can be deleted at any time."
    );
  });

  it("should a subheading for the cookie policy", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Cookie Policy");
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual("H2");
  });

  it("should render a following paragraph of text", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Cookie Policy");
    const para = title.nextElementSibling;
    expect(para?.tagName).toEqual("P");
    expect(para?.textContent).toEqual(
      "There are no cookies at all on this website. Nothing keeps track of what pages you visit nor when. You don't need to agree to accept cookies because there aren't any."
    );
  });

  it("should a subheading for the Input Data", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Input Data");
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual("H2");
  });

  it("should render a following paragraph of text", async () => {
    render(<PrivacyPage />);
    const title = await screen.findByText("Input Data");
    const para = title.nextElementSibling;
    expect(para?.tagName).toEqual("P");
    expect(para?.textContent).toEqual(
      "Data used for searches will remain where it is. It isn't going anywhere. If you do use the form on this website to contact me, the message will be sent to me, personally. The information, however, will remain between us."
    );
  });
});
