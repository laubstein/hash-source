# Hash Source

This is an addon for [Reach Router](https://reach.tech/router) to allow you to
use hash history.

e.g.

```
example.com/#/about
example.com/#/contact
```

```jsx
import { createHistory, Link, LocationProvider, Router } from '@reach/router'
import createHashSource from 'hash-source'
import React from 'react'
import ReactDOM from 'react-dom'
import About from './routes/About'
import Contact from './routes/Contact'
import Home from './routes/Home'

let source = createHashSource()
let history = createHistory(source)

ReactDOM.render(
  <LocationProvider history={history}>
    <header>
      <h1>
        <a href="/">Welcome to React</a>
      </h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        <Link to="contact">Contact</Link>
      </nav>
    </header>

    <hr />

    <Router>
      <Home path="/" />
      <About path="about" />
      <Contact path="contact" />
    </Router>
  </LocationProvider>,
  document.getElementById('root')
)
```