import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component'

import { getAllClients } from "../../data/reducers/client.reducer";

const ClientsDashboard = () => {

    const history = useHistory()
    const dispatch = useDispatch();

    const clientList = useSelector(state => state.clientReducer)?.clients;

    useEffect(() => {
        dispatch(getAllClients());
    }, [])

    const [searchQuery, setSearchQuery] = useState('')

    const tableColumns = [
        { name: 'ID', selector: 'id' },
        { name: 'Client Name', grow: 2, selector: 'clientName', sortable: true },
        { name: 'Actions', cell: (row) => (<div className='action-items'><Link to={'/clients/edit?clientId=' + row.id} className='btn btn-outline btn-sm m-1'><i className='far fa-edit'></i></Link></div>)}
    ]

    const clientData = (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Clients List</h4>
                    </div>
                    <div className="offset-md-4 col-md-2 text-right">
                        <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                    </div>
                    <div className="col-md-12">
                        <DataTable
                            noHeader={true}
                            columns={tableColumns}
                            data={searchQuery === '' ? clientList : clientList.filter(client => client.clientName.toLowerCase().includes(searchQuery.toLowerCase()))}
                            pagination={true}
                        />
                        <br />
                        <button className='btn btn-primary' onClick={() => { history.push("/clients/add") }}>Add New Client</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Clients</li>
            </ol>
            <div className='row'>
                <div className="col-md-12">
                    <h4>All Clients</h4>
                    {clientList !== undefined ? clientData : <div>No clients available</div>}
                </div>
            </div>
        </>
    );
}

export default ClientsDashboard;