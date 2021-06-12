import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSites } from "../../data/reducers/site.reducer";

import DataTable from 'react-data-table-component'


const SitesDashboard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const siteList = useSelector(state => state.siteReducer).sites;

    useEffect(() => {
        dispatch(getAllSites())
    }, [])

    const [searchQuery, setSearchQuery] = useState('')

    const tableColumns = [
        { name: 'ID', selector: 'id' },
        { name: 'Site Name', grow: 2, selector: 'siteName', sortable: true },
        { name: 'Actions', cell: (row) => (<div className='action-items'><Link to={'/sites/edit?siteId=' + row.id} className='btn btn-outline btn-sm m-1'><i className='far fa-edit'></i></Link></div>)}
    ]

    const siteData = (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Sites List</h4>
                    </div>
                    <div className="offset-md-4 col-md-2 text-right">
                        <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                    </div>
                    <div className="col-md-12">
                        <DataTable
                            noHeader={true}
                            columns={tableColumns}
                            data={searchQuery == '' ? siteList : siteList.filter(site => site.siteName.toLowerCase().includes(searchQuery.toLowerCase()))}
                            pagination={true}
                        />
                        <br />
                        <button className='btn btn-primary' onClick={() => { history.push("/sites/add") }}>Add New Site</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Sites</li>
            </ol>
            <div className='row'>
                <div className="col-md-12">
                    <h4>All Sites</h4>
                    {siteList !== undefined ? siteData : <div>No sites available</div>}
                </div>
            </div>
        </>
    );
}

export default SitesDashboard;