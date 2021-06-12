import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";

import Header from "../shared/components/header/Header"
import MenuBar from "./menu"

// homepage
import Homepage from "../pages/homepage/Homepage";
import Dashboard from '../pages/homepage/Dashboard';
import ObservationsDashboard from '../pages/observations/ObservationsDashboard';
import ViewObservation from '../pages/observations/ViewObservation';

// sites
import SitesDashboard from '../pages/sites/SitesDashboard'
import AddSite from '../pages/sites/AddSite'
import EditSite from '../pages/sites/EditSite'

// clients
import ClientsDashboard from '../pages/clients/ClientsDashboard'
import AddClient from '../pages/clients/AddClient'
import EditClient from '../pages/clients/EditClient'

// categories
import CategoriesDashboard from '../pages/categories/CategoriesDashboard'
import AddCategory from '../pages/categories/AddCategory'
import EditCategory from '../pages/categories/EditCategory'

// users
import UsersDashboard from '../pages/users/UsersDashboard'
import AddUser from '../pages/users/AddUser'
import EditUser from '../pages/users/EditUser'

import NavItemsComponent from './navitems.component'

import "./dashboard.routes.scss";

const DashboardRoutes = () => {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>  
<Header setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
      <div id="layoutSidenav">
        {showSideBar==true ? <MenuBar showSideBar={showSideBar} /> : null}
        <div id="layoutSidenav_content">
          <main style={{ paddingTop: '1rem', background: 'whitesmoke' }}>
            <div className='container-fluid'>
              <Switch>
                <Route path="/" exact>
                  <Dashboard />
                </Route> 
                <Route path='/observations' exact>
                  <ObservationsDashboard />
                </Route>
                <Route path='/observations/view' exact>
                  <ViewObservation />
                </Route>
                <Route path='/sites' exact>
                  <SitesDashboard />
                </Route>
                <Route path='/sites/add' exact>
                  <AddSite />
                </Route>
                <Route path='/sites/edit' exact>
                  <EditSite />
                </Route>
                <Route path='/clients' exact>
                  <ClientsDashboard />
                </Route>
                <Route path='/clients/add' exact>
                  <AddClient />
                </Route>
                <Route path='/clients/edit' exact>
                  <EditClient />
                </Route>
                <Route path='/categories' exact>
                  <CategoriesDashboard />
                </Route>
                <Route path='/categories/add' exact>
                  <AddCategory />
                </Route>
                <Route path='/categories/edit' exact>
                  <EditCategory />
                </Route>
                <Route path='/users' exact>
                  <UsersDashboard />
                </Route>
                <Route path='/users/add' exact>
                  <AddUser />
                </Route>
                <Route path='/users/edit' exact>
                  <EditUser />
                </Route>
              </Switch>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Prolifting 2020</div>
                <div>
                  <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};


export default DashboardRoutes;