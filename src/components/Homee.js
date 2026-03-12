import React from "react";
import Dashboard from "./Dashboard";

const Homee = () => {
  // This component no longer performs any authentication checks.
  // Authentication is handled entirely by:
  // - AuthContext
  // - PrivateRoute
  // - AuthHandler (token extraction)
  //
  // Homee's job is ONLY to render the Dashboard after the user is authenticated.

  return <Dashboard />;
};

export default Homee;
