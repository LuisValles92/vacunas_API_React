import React from "react";
import "./App.css";
import CRUD from "./Components/CRUD";
import Home from "./Components/Home";
import DatosGlobales from "./Components/DatosGlobales";
import NavBar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/Home" component={Home}>
            <Home />
          </Route>
          <Route path="/CRUD" component={CRUD}>
            <CRUD />
          </Route>
          <Route path="/DatosGlobales" component={DatosGlobales}>
            <DatosGlobales />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
