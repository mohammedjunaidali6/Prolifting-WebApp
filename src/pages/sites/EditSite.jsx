import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getSiteById, updateSite, deleteSite } from "../../data/reducers/site.reducer";
import { errorMessage } from '../../data/reducers/alert.reducer';

const EditSite = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const site = useSelector(state => state.siteReducer)?.selectedSite;

    const siteId = queryString.parse(location.search).siteId

    const [siteLocal, setSite] = useState(null)

    useEffect(() => {
        dispatch(getSiteById(siteId));
    }, [siteId])

    useEffect(() => {
        if (site !== undefined) {
            setSite(site)
        }
    }, [site])

    const update = async () => {
        try {
            let response = await dispatch(updateSite({ id: siteId, siteName: siteLocal.siteName }));
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

    const del = async () => {
        try {
            let response = await dispatch(deleteSite(siteId));
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
                <li className="breadcrumb-item active">View Site</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>View Site Details</h2>
                    <div>See and modify details of a site</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <form className='row form'>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Site Name</label>
                                        <input className='form-control' value={siteLocal?.siteName} placeholder='Site Name' onChange={(e) => { setSite({ ...siteLocal, siteName: e.target.value }) }}></input>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating product...'); update(); }}>Update Name</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 my-3">
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); del(); }}>Delete Site</button>
                </div>
            </div>
        </>
    )
}

export default EditSite;