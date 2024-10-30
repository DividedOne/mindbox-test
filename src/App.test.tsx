import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import { initialTodos } from "./todos";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Todo App", () => {
  it("allows adding a new todo", () => {
    const { unmount, getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText(/What needs to be done?/i);
    const addButton = getByText(/Add new/i);

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(getByText("New Todo")).toBeInTheDocument();

    unmount();
  });

  it("allows toggling a todo", () => {
    const { unmount, getByLabelText, getByText } = render(<App />);

    const todo = initialTodos[0];
    const checkbox = getByLabelText(todo.task);

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(getByText(todo.task)).toHaveClass("text-gray-300/80 line-through");

    unmount();
  });

  it("filters todos correctly", () => {
    const { unmount, getByLabelText, getByText, queryByText } = render(<App />);

    const todo1 = initialTodos[0]; // not completed
    const todo2 = initialTodos[1]; // completed

    const checkbox = getByLabelText(todo1.task);
    fireEvent.click(checkbox);

    const completedButton = getByText(/Completed/);
    fireEvent.click(completedButton);

    expect(queryByText(todo1.task)).toBeInTheDocument();
    expect(queryByText(todo2.task)).toBeInTheDocument();

    unmount();
  });

  it("clears completed todos", () => {
    const { unmount, getByLabelText, getByText, queryByText } = render(<App />);

    const todo1 = initialTodos[0]; // not completed
    const todo2 = initialTodos[1]; // completed

    const checkbox1 = getByLabelText(todo1.task);
    fireEvent.click(checkbox1);

    expect(getByText(todo1.task)).toBeInTheDocument();
    expect(getByText(todo2.task)).toBeInTheDocument();

    const clearButton = getByText(/Clear completed/);
    fireEvent.click(clearButton);

    expect(queryByText(todo1.task)).not.toBeInTheDocument();
    expect(queryByText(todo2.task)).not.toBeInTheDocument();

    unmount();
  });
});
