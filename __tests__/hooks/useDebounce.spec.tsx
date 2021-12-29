import React from "react";

import { render, fireEvent, screen, act, cleanup } from "@TestUtils";
import { Text } from "@Input";

import { useDebounce } from "@Hooks";

const HookTest: React.FC<{ callback: (val: string) => void }> = ({
  callback,
}) => {
  const [text, setText] = useDebounce(callback);
  return (
    <>
      <Text
        value={text}
        onChange={setText}
        label="Test Input"
        name="test-input"
      />
      <article>{text}</article>
    </>
  );
};

describe("usePagination hook", () => {
  let input: HTMLInputElement;
  let output: HTMLElement;

  const debounceSpy = jest.fn();

  beforeEach(async () => {
    debounceSpy.mockClear();
    jest.useFakeTimers();

    render(<HookTest callback={debounceSpy} />);
    input = (await screen.findByRole("textbox")) as HTMLInputElement;
    output = await screen.findByRole("article");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it("should change the value of the output when the input's value changes", async () => {
    expect(output.textContent).toEqual("");

    await act(async () => {
      fireEvent.change(input, { target: { value: "new value" } });
      jest.runAllTimers();
      expect(output.textContent).toEqual("new value");
    });
  });

  it("should call the callback function after the input's value changes when the timer runs out", async () => {
    await act(async () => {
      expect(debounceSpy).toHaveBeenCalledTimes(1);

      fireEvent.change(input, { target: { value: "new value" } });
      jest.runAllTimers();

      expect(debounceSpy).toHaveBeenCalledTimes(2);
      expect(debounceSpy).toHaveBeenCalledWith("new value");
    });
  });

  it("should not call the callback after the input's value changes and the time hasn't expired", async () => {
    expect(debounceSpy).toHaveBeenCalledTimes(1);
    fireEvent.change(input, { target: { value: "new value" } });
    expect(debounceSpy).toHaveBeenCalledTimes(1);
  });
});
