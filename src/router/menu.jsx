import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useSelector } from "react-redux";

const MenuBar = ({ showSideBar }) => {
    const authInfo = useSelector(state => state.authReducer);
    return (
        <div id="layoutSidenav_nav">
            {showSideBar === false ? '' :
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="/" exact>
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                        </NavLink>
                            <NavLink className="nav-link" to="/observations" exact>
                                <div className="sb-nav-link-icon"><i className="fas fa-file-signature"></i></div>
                                Observations
                        </NavLink>
                            <div className="sb-sidenav-menu-heading">Manage</div>
                            <NavLink className="nav-link" to="/sites">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Sites
                        </NavLink>
                            <NavLink className="nav-link" to="/clients">
                                <div className="sb-nav-link-icon"><i className="fas fa-toolbox"></i></div>
                                Clients
                        </NavLink>
                            <NavLink className="nav-link" to="/categories">
                                <div className="sb-nav-link-icon"><i className="far fa-list-alt"></i></div>
                                Categories
                        </NavLink>
                            <NavLink className="nav-link" to="/users">
                                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                                Users
                        </NavLink>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {authInfo.userName}
                        <Link to={'/users/edit?username=' + authInfo.userName + '&email=' + authInfo.email + '&logout=true'} className='d-flex small'>
                            Change Password
                        </Link>
                    </div>
                </nav>
            }
        </div>

        // <div id="menubar" className="menubar-inverse ">
        //     <div className="menubar-fixed-panel">
        //         <div>
        //             <a className="btn btn-icon-toggle btn-default menubar-toggle" data-toggle="menubar" href="javascript:void(0);">
        //                 <i className="fa fa-bars"></i>
        //             </a>
        //         </div>
        //         <div className="expanded">
        //             <a href="../../html/dashboards/dashboard.html">
        //                 <span className="text-lg text-bold text-primary ">MATERIAL&nbsp;ADMIN</span>
        //             </a>
        //         </div>
        //     </div>
        //     <div className="menubar-scroll-panel">

        //         <ul id="main-menu" className="gui-controls" style={{ marginTop: '64px' }}>

        //             <li>
        //                 <NavLink to="/">
        //                     <div className="gui-icon"><i className="md md-web"></i></div>
        //                     <span className="title">Layouts</span>
        //                 </NavLink>
        //             </li>
        //             <li>
        //                 <NavLink to="/products">
        //                     <div className="gui-icon"><i className="md md-web"></i></div>
        //                     <span className="title">Products</span>
        //                 </NavLink>
        //             </li>

        //         </ul>


        //         <div className="menubar-foot-panel">
        //             <small className="no-linebreak hidden-folded">
        //                 <span className="opacity-75">Copyright &copy; 2014</span> <strong>CodeCovers</strong>
        //             </small>
        //         </div>
        //     </div>
        // </div>
    );
}

export default MenuBar;
