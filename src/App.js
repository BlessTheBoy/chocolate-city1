import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Artist from "./pages/Aritist";
import Album from "./pages/Album";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Nav */}
        <Nav />

        {/* Pages */}
        <div className="container">
          <Switch>
            {/* Aritist Album page */}
            <Route path="/artist/:username/Album:id">
              <Album />
            </Route>

            {/* Aritist page */}
            <Route path="/artist/:username">
              <Artist />
            </Route>

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
