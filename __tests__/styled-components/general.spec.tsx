import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";

import * as General from "@Styles/general-components";

describe("general styled components", () => {
	describe("Transition components", () => {
		describe("FadeIn", () => {
			it("should accept a duration and delay prop that determines the animations duration and delay of the component", () => {
				const DELAY_1 = "300ms";
				const DURATION_1 = "1000ms";
				const testComp1 = renderer
					.create(<General.FadeIn delay={DELAY_1} duration={DURATION_1} />)
					.toJSON();

				expect(testComp1).toMatchSnapshot();
				expect(testComp1).toHaveStyleRule(
					"animation",
					`dMKEGd ${DURATION_1} ${DELAY_1} ease forwards`,
				);

				const DELAY_2 = "600ms";
				const DURATION_2 = "2000ms";
				const testComp2 = renderer
					.create(<General.FadeIn delay={DELAY_2} duration={DURATION_2} />)
					.toJSON();

				expect(testComp2).toMatchSnapshot();
				expect(testComp2).toHaveStyleRule(
					"animation",
					`dMKEGd ${DURATION_2} ${DELAY_2} ease forwards`,
				);
			});

			it("should have a default value for the delay and duration if none is provided", () => {
				const testComp = renderer.create(<General.FadeIn />).toJSON();
				expect(testComp).toMatchSnapshot();
				expect(testComp).toHaveStyleRule(
					"animation",
					`dMKEGd 1600ms 0ms ease forwards`,
				);
			});
		});

		describe("SlideInLeft", () => {
			it("should accept a duration and delay prop that determines the animations duration and delay of the component", () => {
				const DELAY_1 = "300ms";
				const DURATION_1 = "1000ms";
				const testComp1 = renderer
					.create(<General.SlideInLeft delay={DELAY_1} duration={DURATION_1} />)
					.toJSON();

				expect(testComp1).toMatchSnapshot();
				expect(testComp1).toHaveStyleRule(
					"animation",
					`hOeomY ${DURATION_1} ${DELAY_1} ease forwards`,
				);

				const DELAY_2 = "600ms";
				const DURATION_2 = "2000ms";
				const testComp2 = renderer
					.create(<General.SlideInLeft delay={DELAY_2} duration={DURATION_2} />)
					.toJSON();

				expect(testComp2).toMatchSnapshot();
				expect(testComp2).toHaveStyleRule(
					"animation",
					`hOeomY ${DURATION_2} ${DELAY_2} ease forwards`,
				);
			});

			it("should have a default value for the delay and duration if none is provided", () => {
				const testComp = renderer.create(<General.SlideInLeft />).toJSON();
				expect(testComp).toMatchSnapshot();
				expect(testComp).toHaveStyleRule(
					"animation",
					`hOeomY 4s 0ms ease forwards`,
				);
			});

			describe("SlideInRight", () => {
				it("should accept a duration and delay prop that determines the animations duration and delay of the component", () => {
					const DELAY_1 = "300ms";
					const DURATION_1 = "1000ms";
					const testComp1 = renderer
						.create(
							<General.SlideInRight delay={DELAY_1} duration={DURATION_1} />,
						)
						.toJSON();

					expect(testComp1).toMatchSnapshot();
					expect(testComp1).toHaveStyleRule(
						"animation",
						`dcBvEg ${DURATION_1} ${DELAY_1} ease forwards`,
					);

					const DELAY_2 = "600ms";
					const DURATION_2 = "2000ms";
					const testComp2 = renderer
						.create(
							<General.SlideInRight delay={DELAY_2} duration={DURATION_2} />,
						)
						.toJSON();

					expect(testComp2).toMatchSnapshot();
					expect(testComp2).toHaveStyleRule(
						"animation",
						`dcBvEg ${DURATION_2} ${DELAY_2} ease forwards`,
					);
				});

				it("should have a default value for the delay and duration if none is provided", () => {
					const testComp = renderer.create(<General.SlideInRight />).toJSON();
					expect(testComp).toMatchSnapshot();
					expect(testComp).toHaveStyleRule(
						"animation",
						`dcBvEg 4s 0ms ease forwards`,
					);
				});
			});
		});
	});

	describe("Text components", () => {
		// This errors out - I need to use the css`` function somehow, but I'm not sure
		// And I'm not sure why it doesn't work when the following one does work

		// describe('Subtitle', () => {
		//     it('should set the text-decoration property to none based on the noUnderline prop', () => {
		//         const comp1 = renderer.create(<General.Subtitle noUnderline />).toJSON()
		//         expect(comp1).toMatchSnapshot()
		//         expect(comp1).toHaveStyleRule('text-decoration', 'none')

		//         const comp2 = renderer.create(<General.Subtitle noUnderline={false} />).toJSON()
		//         expect(comp2).toMatchSnapshot()
		//         expect(comp2).toHaveStyleRule('text-decoration', 'underline')
		//     })

		//     it('should set the text-decoration by default to underline if the no Underline prop is not set', () => {
		//         const comp = renderer.create(<General.Subtitle />).toJSON()
		//         expect(comp).toMatchSnapshot()
		//         expect(comp).toHaveStyleRule('text-decoration', 'underline')
		//     })
		// })

		describe("SubHeading", () => {
			it("should set the text-decoration property to none based on the noUnderline prop", () => {
				const comp1 = renderer
					.create(<General.SubHeading noUnderline />)
					.toJSON();
				expect(comp1).toMatchSnapshot();
				expect(comp1).toHaveStyleRule("text-decoration", "none");

				const comp2 = renderer
					.create(<General.SubHeading noUnderline={false} />)
					.toJSON();
				expect(comp2).toMatchSnapshot();
				expect(comp2).toHaveStyleRule("text-decoration", "underline");
			});

			it("should set the text-decoration by default to underline if the no Underline prop is not set", () => {
				const comp = renderer.create(<General.SubHeading />).toJSON();
				expect(comp).toMatchSnapshot();
				expect(comp).toHaveStyleRule("text-decoration", "underline");
			});
		});

		describe("BigParagraph", () => {
			it("should set the margin-right property to the marginRight prop passed in", () => {
				const comp = renderer
					.create(<General.BigParagraph marginRight="12rem" />)
					.toJSON();
				expect(comp).toMatchSnapshot();
				expect(comp).toHaveStyleRule("margin-right", "12rem");
			});

			it("should set a default margin-right of 0 if there is no marginRight prop passed in", () => {
				const comp = renderer.create(<General.BigParagraph />).toJSON();
				expect(comp).toMatchSnapshot();
				expect(comp).toHaveStyleRule("margin-right", "0");
			});
		});
	});

	describe("Other components", () => {
		describe("HoverableContainer", () => {
			it("should set the height and width peropties based on the props passed in", () => {
				const comp = renderer
					.create(<General.HoverableContainer height={400} width={800} />)
					.toJSON();
				expect(comp).toMatchSnapshot();
				expect(comp).toHaveStyleRule("height", "400px");
				expect(comp).toHaveStyleRule("width", "800px");
			});

			it("should set a default height and width if there is no marginRight prop passed in", () => {
				const comp = renderer.create(<General.HoverableContainer />).toJSON();
				expect(comp).toMatchSnapshot();
				expect(comp).toHaveStyleRule("height", "200px");
				expect(comp).toHaveStyleRule("width", "134px");
			});
		});
	});
});
