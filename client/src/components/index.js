import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Records from "./Records";
import InputPage from "./InputPage";
import Home from "./Home";
import Customers from "./Customers";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/input' component={InputPage} />
        <Route exact path='/records' component={Records} />
        <Route exact path='/customers' component={Customers} />
        {/* <Route exact path='/records' component={Records} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
