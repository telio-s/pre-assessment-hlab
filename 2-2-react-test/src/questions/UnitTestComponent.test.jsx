/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UnitTestComponent";

const mockFetch = {
  "user-1": jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({ name: "userA", email: "userA@gmail.com" }),
    })
  ),
  "user-2": jest.fn().mockImplementation(() => Promise.resolve({ ok: false })),
  "user-3": jest.fn().mockImplementation(() => new Promise(() => {})),
};

beforeEach(() => (window.fetch = jest.fn().mockReset()));

it("api status ok should display user name and email", async () => {
  const userId = "user-1";
  window.fetch = mockFetch[userId];
  render(<UserProfile userId={userId} />);

  await waitFor(() => {
    screen.getByText("userA", { selector: "h1" });
    screen.getByText("Email: userA@gmail.com", { selector: "p" });
  });

  expect(window.fetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`
  );

  expect(screen.getByText("userA", { selector: "h1" })).toBeInTheDocument();
  expect(
    screen.getByText("Email: userA@gmail.com", { selector: "p" })
  ).toBeInTheDocument();
});

it("api status error should display Error...", async () => {
  const userId = "user-2";
  window.fetch = mockFetch[userId];
  render(<UserProfile userId={userId} />);

  await waitFor(() => screen.getByText("Error: Failed to fetch user data"));

  expect(window.fetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`
  );

  expect(
    screen.getByText("Error: Failed to fetch user data")
  ).toBeInTheDocument();
});

test("api fetching should display Loading...", async () => {
  const userId = "user-3";
  window.fetch = mockFetch[userId];
  render(<UserProfile userId={userId} />);

  await waitFor(() => screen.getByText("Loading..."));

  expect(window.fetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`
  );

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("change user id props should re-render component", async () => {
  let userId = "user-1";
  window.fetch = mockFetch[userId];
  const { rerender } = render(<UserProfile userId={userId} />);

  await waitFor(() => {
    screen.getByText("userA", { selector: "h1" });
    screen.getByText("Email: userA@gmail.com", { selector: "p" });
  });

  expect(window.fetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`
  );

  expect(screen.getByText("userA", { selector: "h1" })).toBeInTheDocument();
  expect(
    screen.getByText("Email: userA@gmail.com", { selector: "p" })
  ).toBeInTheDocument();

  userId = "user-2";
  window.fetch = mockFetch[userId];
  rerender(<UserProfile userId={userId} />);

  await waitFor(() => screen.getByText("Error: Failed to fetch user data"));

  expect(window.fetch).toHaveBeenCalledWith(
    `https://api.example.com/users/${userId}`
  );

  expect(
    screen.getByText("Error: Failed to fetch user data")
  ).toBeInTheDocument();
});
