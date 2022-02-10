import React from "react";
import { Route, Switch } from "react-router";
import AddFood from "../AddFood/AddFood";
import AddStudent from "../AddStudent/AddStudent";
import Distribution from "../Distribution/Distribution";
import ManageFood from "../ManageFood/ManageFood";
import ManageStudent from "../ManageStudent/ManageStudent";
import Sidebar from "../Sidebar/Sidebar";

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Switch>
            <Route exact path="/">
              <h1 className="text-center my-5 py-5">
                Welcome to Yooda Hostel
              </h1>
            </Route>

            <Route path="/addFood">
              <AddFood />
            </Route>

            <Route path="/manageFood">
              <ManageFood />
            </Route>

            <Route path="/addStudent">
              <AddStudent />
            </Route>

            <Route path="/manageStudent">
              <ManageStudent />
            </Route>

            <Route path="/distribution">
              <Distribution />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
