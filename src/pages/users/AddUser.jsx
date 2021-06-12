import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { createAdminUser, createUser, getAllUsers } from "../../data/reducers/user-management.reducer";

import { bindActionCreators } from 'redux';
import { errorMessage } from '../../data/reducers/alert.reducer';

const AddUser = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [user, setUser] = useState({})
    const [userType, setUserType] = useState('admin')

    const create = async () => {
        try {
            let response = userType === 'admin' ? await dispatch(createAdminUser(user)) : await dispatch(createUser(user));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                dispatch(getAllUsers());
                history.push('/users');
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
                <li className="breadcrumb-item active">Add New User</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Add New User</h2>
                    <div>Fill up details for new user</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <div className='container-fluid form'>
                                <section className='my-3 row'>
                                    <div className='col-md-12'>
                                        <h4>User Information</h4>
                                    </div>
                                    <div className='col-md-12 row'>
                                        <div className="col-md-4">
                                            <div className="form-group d-flex flex-row mt-4">
                                                <label className='mr-3'>Type of user: </label>
                                                <div className='display-inline'>
                                                <div className="form-check form-check-inline">
                                                    <input id='adminUserTypeRadioButton' className='form-check-input' type='radio' name='userType' value='admin' checked={userType === 'admin'} onChange={(e) => { if (e.target.value) setUserType('admin') }}/>
                                                    <label htmlFor="adminUserTypeRadioButton" className="form-check-label">Admin User</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input id='siteManagerUserTypeRadioButton' className='form-check-input' type='radio' name='userType' value='siteManager' checked={userType === 'siteManager'} onChange={(e) => { if (e.target.value) setUserType('siteManager') }}/>
                                                    <label htmlFor="siteManagerUserTypeRadioButton" className="form-check-label">Site Manager</label>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="form-group d-flex flex-column">
                                                <label>User Name</label>
                                                <input className='form-control' placeholder='User Name' onChange={(e) => { setUser({ ...user, username: e.target.value }) }}></input>
                                            </div>
                                            <div className="form-group d-flex flex-column">
                                                <label>Email</label>
                                                <input type='email' className='form-control' placeholder='user@example.com' onChange={(e) => { setUser({ ...user, email: e.target.value }) }}></input>
                                            </div>
                                            <div className="form-group d-flex flex-column">
                                                <label>Password</label>
                                                <input type='password' className='form-control' placeholder='password' onChange={(e) => { setUser({ ...user, password: e.target.value }) }}></input>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 my-3'>
                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating user...'); create(); }}>Create</button>
                        &nbsp;&nbsp;
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); history.push('/users'); }}>Discard</button>
                </div>
            </div>
        </>
    )
}

export default AddUser;