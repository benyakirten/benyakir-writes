import React from "react";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { Layout } from "@Layout";
import CategoryTemplate from "@/templates/Category.template";

import store from "@/store";

const Wrapper: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
};

// Because the component loads json file based on a dynamic URL
// The component causes a re-render when the loading is done
// Until I can find a workaround, this renders @testing-library/react unable to perform its tests
describe("category template", () => {
  const testData = [
    {
      pageContext: {
        name: "Category A",
      },
    },
    {
      pageContext: {
        name: "Category B",
      },
    },
  ];
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render correctly", () => {
    const catOne = renderer
      .create(
        <Wrapper>
          <CategoryTemplate {...testData[0]} />
        </Wrapper>
      )
      .toJSON();
    expect(catOne).toMatchSnapshot();

    const catTwo = renderer
      .create(
        <Wrapper>
          <CategoryTemplate {...testData[1]} />
        </Wrapper>
      )
      .toJSON();
    expect(catTwo).toMatchSnapshot();
  });

  // it('should render a header with the category name if it exists', async () => {
  //     render(<CategoryTemplate {...testData[0]} />)

  //     const title = await screen.findByText('Category A')
  //     expect(title.tagName).toEqual('H1')

  //     const posts = await screen.findAllByRole('article')
  //     expect(posts.length).toEqual(3)
  // })

  // it('should render a boilerplate if there are no blog posts for the category', async () => {
  //     render(<CategoryTemplate {...testData[1]} />)

  //     const title = await screen.getByText("Category B")
  //     const para = title.nextElementSibling?.firstElementChild!
  //     expect(para.tagName).toEqual("P")
  //     expect(para.textContent).toEqual("For the category category B, at least. Maybe you want to check out the general blog page instead?")

  //     expect(para.firstElementChild?.getAttribute('href')).toEqual("/blog")
  // })

  // it('should render only the filtered items if there is a filter applied', async () => {
  //     render(<CategoryTemplate {...testData[0]} />)

  //     await act(async () => {
  //         const input = await screen.findAllByRole("textbox")
  //         fireEvent.change(input[0], { target: { value: 'July'} })

  //         jest.runAllTimers()

  //         const posts = await screen.findAllByRole('article')
  //         expect(posts.length).toEqual(2)
  //     })
  // })
});
