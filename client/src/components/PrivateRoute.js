import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { component: component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={renderProps => {
        if (localStorage.getItem("token")) {
          return <Component {...renderProps} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
