import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import DashboardRoutes from "./dashboard.routes";
import Login from "../pages/authentication/Login"
import ForgotPassword from '../pages/authentication/ForgotPassword'
import ChangePassword from '../pages/authentication/ChangePassword'

import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "../data/reducers/auth.reducer";

const PrimaryRoutes = () => {
  const dispatch = useDispatch();
  let authInfo = useSelector(state => state.authReducer);

  useEffect(() => {
    if (authInfo.loggedIn === undefined) dispatch(checkLogin())
  })

  return (
    (authInfo.loggedIn) ?
      <Route><DashboardRoutes /></Route> :
      <Switch>
        <Route path='/forgot-password' exact><ForgotPassword /></Route>
        <Route path='/ChangePassword' exact><ChangePassword /></Route>
        <Route><Login /></Route>
      </Switch>
  );
};

export default PrimaryRoutes;