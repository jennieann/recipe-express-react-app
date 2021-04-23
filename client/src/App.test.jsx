import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"

it("renders without crashing", () => {
  const { container } = render(
    <Router>
      <App />
    </Router>
  )
  expect(screen.getByText("Mina recept")).toBeInTheDocument()
  expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="App"
  >
    <h1
      class="header"
    >
      Mina recept
    </h1>
    <nav
      class="navbar"
    >
      <div
        class="navbar-container"
      >
        <a
          aria-current="page"
          class="nav-link nav-link-active"
          href="/"
        >
          Hem
        </a>
        <a
          class="nav-link"
          href="/categories"
        >
          Kategorier
        </a>
        <a
          class="nav-link"
          href="/addRecipe"
        >
          Lägg till recept
        </a>
      </div>
    </nav>
  </div>
</div>
`)
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
})
