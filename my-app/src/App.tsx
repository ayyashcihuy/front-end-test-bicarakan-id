import "./App.css";
import Home from "./view/Home";
import Navbar from "./view/Sidebar";
import { Switch, Route } from "react-router-dom";
import CreateTask from "./view/CreateTask";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/create-task">
          <CreateTask />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
