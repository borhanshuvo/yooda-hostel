import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="container">
      <div className="pb-3">
        <Link className="nav-link text-dark" to="/">
          <h4>YOODA HOSTEL</h4>
        </Link>
      </div>

      <div>
        <NavLink
          activeClassName="bg-primary text-white"
          className="nav-link text-dark"
          to="/addFood"
        >
          Add Food
        </NavLink>
        <NavLink
          activeClassName="bg-primary text-white"
          className="nav-link text-dark"
          to="/manageFood"
        >
          Manage Food
        </NavLink>
        <NavLink
          activeClassName="bg-primary text-white"
          className="nav-link text-dark"
          to="/addStudent"
        >
          Add Student
        </NavLink>
        <NavLink
          activeClassName="bg-primary text-white"
          className="nav-link text-dark"
          to="/manageStudent"
        >
          Manage Student
        </NavLink>
        <NavLink
          activeClassName="bg-primary text-white"
          className="nav-link text-dark"
          to="/distribution"
        >
          Distribution
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
