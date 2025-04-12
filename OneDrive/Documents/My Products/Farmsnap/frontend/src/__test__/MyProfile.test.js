import { render, screen, fireEvent } from "@testing-library/react";
import MyProfile from "../components/MyProfile"; 
import "@testing-library/jest-dom";

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify({ username: "Balaji", email: "balaji@example.com" }));
});

afterEach(() => {
  localStorage.clear();
});

test("renders profile with correct username and email", () => {
  render(<MyProfile />);
  
  expect(screen.getByText("Username")).toBeInTheDocument();
  expect(screen.getByDisplayValue("")).toBeInTheDocument();
});

test("shows edit form when clicking edit button", () => {
  render(<MyProfile />);

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  expect(screen.getByText("Save")).toBeInTheDocument();
});

test("updates username and email on save", () => {
  render(<MyProfile />);
  
  fireEvent.click(screen.getByText("Edit"));

  const usernameInput = screen.getByDisplayValue("Balaji");
  fireEvent.change(usernameInput, { target: { value: "New Name" } });

  const emailInput = screen.getByDisplayValue("balaji@example.com");
  fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });

  fireEvent.click(screen.getByText("Save"));

  expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
  expect(screen.getByDisplayValue("newemail@example.com")).toBeInTheDocument();
});

test("clicking pencil icon opens file input", () => {
  render(<MyProfile />);

  const fileInput = screen.getByLabelText("Profile");
  expect(fileInput).toHaveAttribute("type", "file");
});
