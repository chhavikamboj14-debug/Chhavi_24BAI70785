import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Interactive Calendar", () => {
  test("renders the calendar title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Interactive Calendar",
      })
    ).toBeInTheDocument();
  });

  test("renders all days of the week", () => {
    render(<App />);

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    days.forEach((day) => {
      expect(
        screen.getByTestId(`day-${day}`)
      ).toBeInTheDocument();
    });
  });

  test("renders optimization controls", () => {
    render(<App />);

    expect(
      screen.getByRole("button", {
        name: "React.memo on cards",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "useCallback for handlers",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "useMemo for agenda filter",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Live clock",
      })
    ).toBeInTheDocument();
  });

  test("renders event cards", () => {
    render(<App />);

    expect(
      screen.getByTestId("event-1")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("event-2")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("event-5")
    ).toBeInTheDocument();
  });

  test("allows optimization switches to be toggled", async () => {
    const user = userEvent.setup();

    render(<App />);

    const memoSwitch = screen.getByRole("button", {
      name: "React.memo on cards",
    });

    expect(memoSwitch).toHaveAttribute("aria-pressed", "true");

    await user.click(memoSwitch);

    expect(memoSwitch).toHaveAttribute("aria-pressed", "false");

    await user.click(memoSwitch);

    expect(memoSwitch).toHaveAttribute("aria-pressed", "true");
  });

  test("loads events through the mocked API", async () => {
    render(<App />);

    const portfolioEvent = await screen.findByTestId("event-8");

    expect(portfolioEvent).toBeInTheDocument();
    expect(portfolioEvent).toHaveTextContent("Portfolio review");
    expect(portfolioEvent).toHaveTextContent("Focus block");
  });
});