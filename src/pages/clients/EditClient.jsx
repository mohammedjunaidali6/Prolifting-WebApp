import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Form } from 'react-bootstrap'
import './Clients.scss'

import { useDispatch, useSelector } from 'react-redux'
import { getClientById, updateClient, deleteClient, addSiteToClient, removeSiteFromClient, updateSiteAssociation } from "../../data/reducers/client.reducer";
import { getAllDropdowns } from "../../data/reducers/configuration-data.reducer";
import { errorMessage } from '../../data/reducers/alert.reducer'

const EditClient = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const clientId = queryString.parse(location.search).clientId

    const [clientLocal, setClient] = useState(null)

    const client = useSelector(state => state.clientReducer)?.selectedClient;
    const { clients, sites } = useSelector(state => state.configurationReducer);

    useEffect(() => {
        dispatch(getClientById(clientId));
        dispatch(getAllDropdowns());
    }, [clientId])

    useEffect(() => {
        if (client !== undefined) {
            setClient(client)
        }
    }, [client])

    const update = async () => {
        try {
            let response = await dispatch(updateClient({ id: clientId, clientName: clientLocal.clientName }));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/clients');
                dispatch(getAllDropdowns());
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const del = async () => {
        try {
            let response = await dispatch(deleteClient(clientId));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/clients');
                dispatch(getAllDropdowns());
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const updateSites = async () => {
        try {
            let response = await dispatch(updateSiteAssociation({ clientId: clientLocal.id, sitesId: clientLocal.sites }));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/clients');
                dispatch(getAllDropdowns());
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const showSites = () => {
        // console.log(clientLocal.sites);
        return sites?.map(site => (
            <Form.Check
                key={site.id}
                label={site.siteName}
                checked={clientLocal?.sites?.includes(site.id)}
                onChange={(e) => { e.currentTarget.checked ? dispatch(addSiteToClient(site.id)) : dispatch(removeSiteFromClient(site.id)) }}>
            </Form.Check>
        ))
    };

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item"><Link to='/clients'>Clients</Link></li>
                <li className="breadcrumb-item active">View Client</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>View Client Details</h2>
                    <div>See and modify details of a client</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <form className='row form'>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Client Name</label>
                                        <input className='form-control' value={clientLocal?.clientName} placeholder='Client Name' onChange={(e) => { setClient({ ...clientLocal, clientName: e.target.value }) }}></input>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating product...'); update(); }}>Update Name</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                            <h4>Site Association</h4>
                            <p>Select sites which are associated with this client.</p>
                            <div className="row">
                                <div className="col-md-4">
                                    <ul role='listbox'>
                                        {clientLocal?.sites ? showSites() : ''}
                                    </ul>
                                </div>
                            </div>
                            <button className='btn btn-primary' onClick={(e) => { updateSites(); }}>Update Associated Sites</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 my-3">
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); del(); }}>Delete Client</button>
                </div>
            </div>
        </>
    )
}

export default EditClient;