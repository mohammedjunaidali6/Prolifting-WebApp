import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useSelector, useDispatch } from 'react-redux';
import { getAllObservations } from "../../data/reducers/observation.reducer";
import { errorMessage } from "../../data/reducers/alert.reducer";
import { Row, Col } from 'react-bootstrap';
import ObservationImage from './ObservationImage';

const ViewObservation = ({observationId}) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    // const observationId = queryString.parse(location.search).observationId;

    const [observationLocal, setObservation] = useState(null);

    const observationList = useSelector(state => state.observationReducer).observations;

    useEffect(() => {
        if (observationList === undefined || observationList.length === 0) {
            dispatch(getAllObservations());
        }
    }, []);

    useEffect(() => {
        if (observationList !== undefined && observationList.length > 0) {
            let ob = observationList.find(observation => observation.id === parseInt(observationId));
            setObservation(ob);
        }
    }, [observationId, observationList])

    return (
        <>
           {/*    <ol className="breadcrumb mb-4">
             <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item"><Link to='/observations'>Observations</Link></li>
    <li className="breadcrumb-item active">View Observation</li> 
            </ol> */}

            <div className="row">
                <div className="col-md-12">
               {/*     <h2>View Observation Details</h2> 
                    <div>See all details of an observation by site manager</div> */}
                    <br />
                    <div className="card">
                        <div className="card-body">
                            <form className="form">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input className='form-control' disabled value={(new Date(observationLocal?.date))?.toLocaleDateString()}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Site</label>
                                            <input className='form-control' disabled value={observationLocal?.siteName}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Client</label>
                                            <input className='form-control' disabled value={observationLocal?.client}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <input className='form-control' disabled value={observationLocal?.category}></input>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Action Taken</label>
                                            <input className='form-control' disabled value={observationLocal?.actionRequired}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className='form-control' rows='5' disabled>
                                                {observationLocal?.description}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                {observationLocal?.siteManagementImages?.length > 0 ? (
                                    <>
                                        <h4>Images</h4>
                                        <Row md={6} lg={6} sm={4} xs={2}>
                                            {observationLocal?.siteManagementImages?.map(image => (
                                                <Col key={image} className="mr-3 mt-3">
                                                    <ObservationImage observationId={observationLocal.id} fileName={image} />
                                                </Col>
                                            ))}
                                        </Row>
                                    </>
                                ) : ''}
                            </form>
                        </div>
                    </div>
                   {/* <button className='btn btn-secondary mt-3' onClick={(e) => { history.push('/observations') }}>Go Back</button> */}
                </div>
            </div>
        </>
    )
}

export default ViewObservation;