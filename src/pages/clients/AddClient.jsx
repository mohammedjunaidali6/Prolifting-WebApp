import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { createClient } from "../../data/reducers/client.reducer";

import { bindActionCreators } from 'redux';
import { errorMessage } from '../../data/reducers/alert.reducer';

const AddClient = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [client, setClient] = useState({})

    const create = async () => {
        try {
            let response = await dispatch(createClient(client))
            if (response.error) {
                console.log(response.error);
                dispatch(errorMessage(response.error.message));
            }
            else {
                // navigate to clients dashboard page
                history.push('/clients')
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
                <li className="breadcrumb-item"><Link to='/clients'>Clients</Link></li>
                <li className="breadcrumb-item active">Add New Client</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Add New Client</h2>
                    <div>Fill up details for new client</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <div className='container-fluid form'>
                                <section className='my-3 row'>
                                    <div className='col-md-12'>
                                        <h4>Basic Client Details</h4>
                                        <p>Client information</p>
                                    </div>
                                    <div className='col-md-12 row'>
                                        <div className="col-md-4">
                                            <div className="form-group d-flex flex-column">
                                                <label>Client Name</label>
                                                <input className='form-control' placeholder='Client Name' onChange={(e) => { setClient({ ...client, clientName: e.target.value }) }}></input>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 my-3'>
                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating client...'); create(); }}>Create</button>
                        &nbsp;&nbsp;
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); history.push('/clients'); }}>Discard</button>
                </div>
            </div>
        </>
    )
}

export default AddClient;