import React from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch } from "react-redux";
import { logoutUser } from "../data/reducers/auth.reducer";


function NavItemsComponent(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div
      className="nav-items"
      onClick={
        () => {
          if (props.title !== "Log Out")
            history.push(props.link);
          else
            dispatch(logoutUser())
        }
      }
    >
      <img src={props.itemLogo} alt="nav-icon" className="nav-icon" />

      <p className="nav-items-title">{props.title}</p>
    </div>
  );
}

export default NavItemsComponent;