import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllObservations } from "../../data/reducers/observation.reducer";
import ViewObservation from './ViewObservation';

import { Modal, Button } from 'react-bootstrap'

import DataTable from 'react-data-table-component';

const ObservationsDashboard = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const observationsList = useSelector(state => state.observationReducer).observations;

    useEffect(() => {
        dispatch(getAllObservations());
    }, []);

    const [searchQuery, setSearchQuery] = useState('')
    const [show, setShow] = useState(false);

    const [observationID, setObservationID] = useState(0)


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const tableColumns = [
        { name: 'ID', selector: 'id' },
        { name: 'Date', grow: 2, selector: 'date', sortable: true, cell: (row) => (new Date(row.date)).toLocaleDateString() },
        { name: 'Client Name', grow: 2, selector: 'client', sortable: true },
        { name: 'Site Name', grow: 2, selector: 'siteName', sortable: true },
        { name: 'Contractor', grow: 2, selector: 'contractor', sortable: true },
        { name: 'Category', grow: 2, selector: 'category', sortable: true },
        { name: 'Images', selector: 'siteManagementImages.length', sortable: true, cell: (row) => (<><i class="far fa-image"></i>&nbsp;{row.siteManagementImages.length}</>) },
        { name: 'Reported By', grow: 2, selector: 'reportedBy', sortable: true },
        {
            name: 'Actions', cell: (row) => (<div>
                <Button variant="outline" onClick={(e) => {
                    setObservationID(row.id);
                    handleShow();
                }}>
                    <i class='fas fa-eye'></i>
                </Button>
                
            </div>)
        }
    ]

    const observationData = (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Observations List</h4>
                    </div>
                    <div className="offset-md-4 col-md-2 text-right">
                        <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                    </div>
                    <div className="col-md-12">
                        <DataTable
                            noHeader={true}
                            columns={tableColumns}
                            data={searchQuery === '' ? observationsList : observationsList.filter(observation => {
                                let searchQueryLowerCase = searchQuery.toLowerCase();
                                return (observation.client?.toLowerCase().includes(searchQueryLowerCase)) ||
                                    (observation.siteName?.toLowerCase().includes(searchQueryLowerCase)) ||
                                    (observation.contractor?.toLowerCase().includes(searchQueryLowerCase)) ||
                                    (observation.category?.toLowerCase().includes(searchQueryLowerCase)) ||
                                    (observation.reportedBy?.toLowerCase().includes(searchQueryLowerCase))
                            })}
                            pagination={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>



            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Observations</li>
            </ol>
            <div className='row'>
                <div className="col-md-12">
                    <h4>All Observations</h4>
                    {observationsList !== undefined ? observationData : <div>No observations available</div>}
                </div>
            </div>

            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                    <Modal.Title><h2>View Observation Details</h2>
                        <small>See all details of an observation by site manager</small>
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <ViewObservation observationId={observationID} />


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
    </Button> */}
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ObservationsDashboard