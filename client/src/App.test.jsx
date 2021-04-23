import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"

it("renders without crashing", async () => {
  render(
    <Router>
      <App />
    </Router>
  )
  expect(screen.getByText("Mina recept")).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "Kategorier" })).toBeInTheDocument()
})
