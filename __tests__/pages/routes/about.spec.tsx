import React from 'react';

import { cleanup, render, screen } from '@TestUtils';
import AboutPage from '@/pages/about';
import { SVGImageQuery } from '@Types/query';
import { allIcons } from '../../props';

describe('about page', () => {
  const aboutData: SVGImageQuery = {
    data: {
      allFile: {
        // This is the effect of the filter in the query
        nodes: allIcons.filter(
          (i) => i.name === 'Twitter' || i.name === 'GitHub' || i.name === 'Blog',
        ),
      },
    },
  };

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(() => render(<AboutPage data={aboutData.data} />));
  });

  it('should render a heading with the page title with a following paragraph', async () => {
    render(<AboutPage data={aboutData.data} />);
    const titles = await screen.getAllByText('About');
    const title = titles[1];
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual('H1');

    const para = title.nextElementSibling!;
    expect(para.tagName).toEqual('P');
    expect(para.textContent).toEqual(
      "This is a site that has, more or less, the same functionality as my blog I imagine that you're asking why this page exists when a normal version can be found at benyakiredits.com.",
    );

    expect(para.firstElementChild?.getAttribute('href')).toEqual('https://benyakiredits.com');
  });

  it('should render a secondary heading and paragraph to explain the technology', async () => {
    render(<AboutPage data={aboutData.data} />);
    const title = await screen.getByText('The Technology');
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual('H2');

    const para = title.nextElementSibling!;
    expect(para.tagName).toEqual('P');
    expect(para.textContent).toEqual(
      "This website's powered by GatsbyJS. It may not mean much to you, but there are a few reasons why this is valuable. Gatsby uses React, which is a single page application. Normally, when you visit a website, your computer sends a request to a server that processes the request then sends information back. On my WordPress blog, every time you visit a new page, the server processes the request, generates the page based on the pages and posts then sends back information. React, on the other hand, doesn't do this. Your computer sends only one request. It sends back one package that contains everything. Gatsby is a little addition that has a few extra features to allow search engine optimization and the use of GraphQL.",
    );

    expect(para.firstElementChild?.getAttribute('href')).toEqual('https://www.gatsbyjs.com');
  });

  it('should render a third paragraph with a heading and paragraph', async () => {
    render(<AboutPage data={aboutData.data} />);
    const title = await screen.getByText('Some Examples');
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual('H2');

    const para = title.nextElementSibling!;
    expect(para.tagName).toEqual('P');
    expect(para.textContent).toEqual(
      "First thing you can notice is that each section zooms out and does something instead of having to load an entirely new page. Also the sidebar stays open no matter what page you visit. This is possible because of React. Or, rather, it's facilitated by React. It wouldn't be easy with just WordPress, and having a second site with its own routing and data management makes it easier. Gatsby makes that a cinch in a bunch of complicated ways I don't want to explain right now.",
    );
  });

  it('should render a fourth set of items that is a row of figures that are links to other sites', async () => {
    render(<AboutPage data={aboutData.data} />);
    const title = await screen.getByText('My Links');
    expect(title).toBeTruthy();
    expect(title.tagName).toEqual('H2');

    const figures = title.nextElementSibling!.firstElementChild!.children;
    expect(figures.length).toEqual(3);
  });
});
