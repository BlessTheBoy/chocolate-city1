import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          {/* Nav */}
          <Nav />

          {/* Page content */}
          <Switch>
            <Route path="/about">{/* <About /> */}</Route>
            <Route path="/contact">{/* <Users /> */}</Route>
            <Route path="/">
              {/* Home page */}

              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
