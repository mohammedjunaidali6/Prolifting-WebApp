import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser  } from "../../data/reducers/auth.reducer";
import { getUserByUsername, resetPassword, toggleUserActivation, updateRole } from "../../data/reducers/user-management.reducer";
import { errorMessage, successMessage } from '../../data/reducers/alert.reducer';

const EditUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const username = queryString.parse(location.search).username;
    const logoutOnCompletion = queryString.parse(location.search).logout;

    const { email, role, isActive } = useSelector((state) => state.userManagementReducer).selectedUser;
    // const email = queryString.parse(location.search).email;
    
    // const userRole = decodeURI(queryString.parse(location.search).role);
    // const isActive = queryString.parse(location.search).isActive.toLowerCase() === 'true' ? true : false;

    const [userCredentials, setUserCredentials] = useState({ email })

    const fetchUser = async () => {
        try {
            let response = await dispatch(getUserByUsername(username));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            } 
            setUserCredentials({...userCredentials, email: response.payload.email});
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    };

    useEffect(() => {
        fetchUser();
    }, [username])

    const reset = async () => {
        if (userCredentials.password !== userCredentials.confirmPassword) {
            dispatch(errorMessage('Password and Confirm Password do not match.'))
            return;
        }
        var regEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!.%*?&])[A-Za-z\\d@$!.%*?&]{8,}$');
        if (!regEx.test(userCredentials.password)) {
            dispatch(errorMessage('Password must contain at least one special character, one number, one lower case and one upper case character and should be of 8 characters.'))
            return;
        }
        try {
            let response = await dispatch(resetPassword(userCredentials));
            if (response.error) {
                console.log(response.error);
                dispatch(errorMessage(response.error.message));
            }
            else {
                if (logoutOnCompletion) {
                    dispatch(logoutUser());
                }
                else {
                    history.push('/users');
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const toggleActivation = () => {
        try {
            let response = dispatch(toggleUserActivation({ userName: username, isActive }))
            if (response.error) {
                console.log(response.error);
                dispatch(errorMessage(response.error.message));
            }
            else {
                dispatch(successMessage(`User ${isActive === true ? 'Deactivated' : 'Activated'} successfully!`));
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const changeRole = () => {
        try {
            let response = dispatch(updateRole({ userName: username, isAdmin: role === 'Site-Manager' }));
            if (response.error) {
                console.log(response.error);
                dispatch(errorMessage(response.error.message));
            } else {
                dispatch(successMessage('User role updated successfully!'));
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item"><Link to='/users'>Users</Link></li>
                <li className="breadcrumb-item active">Edit User</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Edit User</h2>
                    <div>Reset user's password here.</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <form className='row form'>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Username</label>
                                        <input className='form-control' value={username} placeholder='User Name' disabled></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Email</label>
                                        <input className='form-control' value={email} placeholder='Email' disabled></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>New Password</label>
                                        <input type='password' className='form-control' placeholder='Password' onChange={(e) => { setUserCredentials({ ...userCredentials, password: e.target.value }) }}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Confirm Password</label>
                                        <input type='password' className='form-control' placeholder='Confirm Password' onChange={(e) => { setUserCredentials({ ...userCredentials, confirmPassword: e.target.value }) }}></input>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('resetting password...'); reset(); }}>Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 my-3">
                    <button className='btn btn-secondary' onClick={(e) => { e.preventDefault(); history.push('/users') }}>Go Back</button>
                </div>
                <div className="col-md-6 my-3 text-right">
                    <button className='btn btn-primary' onClick={(e) => { changeRole(); }}>Change Role to { role === 'Admin' ? 'Site-Manager' : 'Admin' }</button>
                    &nbsp;
                    <button className='btn btn-danger' onClick={(e) => { toggleActivation(); }}>{isActive === true ? 'Deactivate' : 'Activate'} User</button>
                </div>
            </div>
        </>
    )
}

export default EditUser;