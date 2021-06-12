import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { getMasterDataAPI } from '../../data/services/configuration-data.service'
import DataTable from 'react-data-table-component'

const Homepage = () => {

    const history = useHistory()
    const [masterData, setMasterData] = useState(undefined)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        (async () => {
            if (masterData === undefined) {
                let response = await getMasterDataAPI()
                if (response.isSuccessful) {
                    setMasterData(response.data)
                }
            }
        })();
    })

    let masterList = (<> </>)

    if (masterData !== undefined) {
        const tableColumns = [
            { name: 'ID', selector: 'id' },
            { name: 'Date', cell: (row) => ((new Date(row.date)).toLocaleDateString()) },
            { name: 'Site', selector: 'site' },
            { name: 'Client', selector: 'client'},
            { name: 'Contractor', selector: 'contractor' },
            { name: 'Reported By', selector: 'reportedBy' },
            { name: 'Category', selector: 'category' },
            { name: 'Actions', cell: (row) => (<div className='action-items'><Link to={'/sites/edit?siteId=' + row.id} className='btn btn-outline btn-sm m-1'><i className='far fa-edit'></i></Link></div>)}
        ]

        masterList = (
            <div className="card" style={{ marginTop: '1rem' }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h4></h4>
                        </div>
                        <div className="offset-md-4 col-md-2 text-right">
                            <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                        </div>
                        <div className="col-md-12">
                            <DataTable
                                noHeader={true}
                                columns={tableColumns}
                                data={searchQuery == '' ? masterData : masterData.filter(data => data.site.toLowerCase().includes(searchQuery.toLowerCase()))}
                                pagination={true}
                            />
                            <br />
                            {/* <button className='btn btn-primary' onClick={() => { history.push("/sites/add") }}>Add New Site</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>


                


            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Home</li>
            </ol>
            <div className='col-md-12'>
                <div className='row' style={{ padding: '20px' }}>
                    <h1>Welcome to Prolifting Dashboard</h1>
                </div>
            </div>

            <div className='row'>
                <div className="col-md-12">
                    <h4></h4>
                    {masterData !== undefined ? masterList : <div>No sites available</div>}
                </div>
            </div>
        </>
    )
}

export default Homepage