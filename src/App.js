import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

import toastr from 'toastr';
import PrimaryRoutes from "./router/primary.routes";
import './App.scss';
// import './shared/styles/material-admin.css'
// import './shared/styles/material-iconic-font.css'
import './shared/styles/sbadmin.css'
import 'bootstrap-daterangepicker/daterangepicker.css';

function App() {
  const { infoMessage, successMessage, dangerMessage } = useSelector((state) => state.alertReducer);

  useEffect(() => {
    if (infoMessage)
      toastr.info(infoMessage.message);
  }, [infoMessage]);

  useEffect(() => {
    if (successMessage)
      toastr.success(successMessage.message);
  }, [successMessage]);

  useEffect(() => {
    if (dangerMessage)
      toastr.error(dangerMessage.message);
  }, [dangerMessage]);

  return (
    <div className="App">
      <BrowserRouter>
        <PrimaryRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
