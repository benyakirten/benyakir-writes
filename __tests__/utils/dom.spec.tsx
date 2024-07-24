import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import * as dom from "@Utils/dom";

enum DataPosition {
	CORRECT = 0,
	MISSING = 1,
	MISPLACED = 2,
}

const Wrapper: React.FC<{ setup?: DataPosition }> = ({ setup }) => {
	const [val, setValue] = React.useState<boolean>();
	const clickHandler = (e: React.BaseSyntheticEvent) => {
		const newVal = dom.findAttrInElTree(e.target, "data-attr", "value");
		setValue(newVal);
	};

	if (setup === DataPosition.MISPLACED) {
		return (
			<html>
				<head>
					<title data-attr="value">Test Component</title>
				</head>
				<body>
					<div>
						<div>
							<div>
								<div>
									<div>
										<div>
											<button onClick={clickHandler} />
											<article>{`${val}`}</article>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</body>
			</html>
		);
	} else if (setup === DataPosition.MISSING) {
		return (
			<html>
				<head>
					<title>Test Component</title>
				</head>
				<body>
					<div>
						<div>
							<div>
								<div>
									<div>
										<div>
											<button onClick={clickHandler} />
											<article>{`${val}`}</article>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</body>
			</html>
		);
	} else {
		return (
			<html>
				<head>
					<title>Test Component</title>
				</head>
				<body>
					<div>
						<div data-attr="value">
							<div>
								<div>
									<div>
										<div>
											<button onClick={clickHandler} />
											<article>{`${val}`}</article>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</body>
			</html>
		);
	}
};

describe("dom util", () => {
	beforeEach(cleanup);

	describe("findAttrInTree", () => {
		it("should render undefined if the button hasn't been clicked yet", async () => {
			render(<Wrapper />);
			const output = await screen.findByRole("article");
			expect(output.textContent).toEqual("undefined");
		});
		it("should return true if it finds any element in a dom tree with the correct attribute with the correct value", async () => {
			render(<Wrapper />);
			const button = await screen.findByRole("button");
			const output = await screen.findByRole("article");

			fireEvent.click(button);
			expect(output.textContent).toEqual("true");
		});

		it("should return false if there is an element with the correct attribute with the correct value but it is not in the body", async () => {
			render(<Wrapper setup={DataPosition.MISPLACED} />);
			const button = await screen.findByRole("button");
			const output = await screen.findByRole("article");

			fireEvent.click(button);
			expect(output.textContent).toEqual("false");
		});

		it("should return false if it finds no element in a dom tree with the correct attribute with a correct value", async () => {
			render(<Wrapper setup={DataPosition.MISSING} />);
			const button = await screen.findByRole("button");
			const output = await screen.findByRole("article");

			fireEvent.click(button);
			expect(output.textContent).toEqual("false");
		});
	});
});
