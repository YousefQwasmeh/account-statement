import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Records from "./Records";
import InputPage from "./InputPage";
import Home from "./Home";
import Customers from "./Customers";
import UploadFile from "./UploadFile";
import CustomerRecords from "./CustomerRecords";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/input' component={InputPage} />
        <Route exact path='/records' component={Records} />
        <Route exact path='/customers' component={Customers} />
        <Route exact path='/upload' component={UploadFile} />
        <Route exact path='/myrecords/:url' component={CustomerRecords} />
        {/* <Route exact path='/records' component={Records} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
