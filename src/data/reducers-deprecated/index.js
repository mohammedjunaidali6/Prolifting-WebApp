import { combineReducers } from "redux"
import authReducer from "./auth.reducer"
import siteReducer from './site.reducer'
import clientReducer from './client.reducer'
import categoryReducer from './category.reducer'
import userManagementReducer from './user-management.reducer'
import configurationReducer from './configuration-data.reducer'
import alertReducer from './alert.reducer'

const rootReducer = combineReducers({
    authReducer,
    siteReducer,
    clientReducer, 
    categoryReducer,
    userManagementReducer,
    configurationReducer,
    alertReducer
})

export default rootReducer