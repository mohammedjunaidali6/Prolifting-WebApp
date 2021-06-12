import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { createSite } from "../../data/reducers/site.reducer";
import { errorMessage } from '../../data/reducers/alert.reducer';

const AddSite = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [site, setSite] = useState({});

    const create = async () => {
        try {
            let response = await dispatch(createSite(site));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/sites');
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
                <li className="breadcrumb-item"><Link to='/sites'>Sites</Link></li>
                <li className="breadcrumb-item active">Add New Site</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Add New Site</h2>
                    <div>Fill up details for new site</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <div className='container-fluid form'>
                                <section className='my-3 row'>
                                    <div className='col-md-12'>
                                        <h4>Basic Site Details</h4>
                                        <p>Site information</p>
                                    </div>
                                    <div className='col-md-12 row'>
                                        <div className="col-md-4">
                                            <div className="form-group d-flex flex-column">
                                                <label>Site Name</label>
                                                <input className='form-control' placeholder='Site Name' onChange={(e) => { setSite({ ...site, siteName: e.target.value }) }}></input>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 my-3'>
                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating site...'); create(); }}>Create</button>
                        &nbsp;&nbsp;
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); history.push('/sites'); }}>Discard</button>
                </div>
            </div>
        </>
    )
}

export default AddSite