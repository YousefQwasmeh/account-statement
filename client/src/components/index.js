import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Records from "./Records";
import Home from "./Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/records' component={Records} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
