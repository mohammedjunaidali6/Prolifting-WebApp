import { combineReducers } from "redux";
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer';
import categoryReducer from './category.reducer';
import clientReducer from './client.reducer';
import userManagementReducer from './user-management.reducer';
import configurationReducer from './configuration-data.reducer';
import siteReducer from './site.reducer';
import dashboardReducer from './dashboard.reducer';
import observationReducer from './observation.reducer';

const rootReducer = combineReducers({
    authReducer,
    alertReducer,
    categoryReducer,
    clientReducer,
    userManagementReducer,
    configurationReducer,
    siteReducer,
    dashboardReducer,
    observationReducer,
});

export default rootReducer;