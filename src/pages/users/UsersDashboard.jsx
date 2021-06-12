import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component'

import { getAllUsers } from "../../data/reducers/user-management.reducer";

const UsersDashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userList = useSelector(state => state.userManagementReducer).users;

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const [searchQuery, setSearchQuery] = useState('')

    const tableColumns = [
        { name: 'User Name', grow: 2, selector: 'userName', sortable: true },
        { name: 'Email', grow: 2, selector: 'email' },
        { name: 'Role', selector: 'role' },
        { name: 'Status', selector: 'isActive', cell: (row) => row.isActive ? 'Activate' : 'Deactivated', sortable: true },
        { name: 'Actions', cell: (row) => (<div className='action-items'><Link to={'/users/edit?username=' + row.userName} className='btn btn-outline btn-sm m-1'><i className='far fa-edit'></i></Link></div>)}
    ]

    const userData = (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Users List</h4>
                    </div>
                    <div className="offset-md-4 col-md-2 text-right">
                        <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                    </div>
                    <div className="col-md-12">
                        <DataTable
                            noHeader={true}
                            columns={tableColumns}
                            data={
                                searchQuery === '' ? 
                                userList : 
                                userList.filter(user => 
                                    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    user.role.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                            }
                            pagination={true}
                        />
                        <br />
                        <button className='btn btn-primary' onClick={() => { history.push("/users/add") }}>Add New User</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Users</li>
            </ol>
            <div className='row'>
                <div className="col-md-12">
                    <h4>All Users</h4>
                    {userList !== undefined ? userData : <div>No users available</div>}
                </div>
            </div>
        </>
    );
}

export default UsersDashboard;