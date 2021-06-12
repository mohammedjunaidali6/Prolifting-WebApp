import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component'

import { getAllCategories } from "../../data/reducers/category.reducer";

const CategoriesDashboard = () => {
    const dispatch = useDispatch();
    const categoryList = useSelector(state => state.categoryReducer)?.categories;
    const history = useHistory();
    useEffect(() => {
        if (categoryList === undefined || categoryList?.length === 0) {
            dispatch(getAllCategories());
        }
    }, []);

    const [searchQuery, setSearchQuery] = useState('');

    const tableColumns = [
        { name: 'ID', selector: 'id' },
        { name: 'Category Name', grow: 2, selector: 'categoryName', sortable: true },
        { name: 'Actions', cell: (row) => (<div className='action-items'><Link to={'/categories/edit?categoryId=' + row.id} className='btn btn-outline btn-sm m-1'><i className='far fa-edit'></i></Link></div>)}
    ]

    const categoryData = (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Categories List</h4>
                    </div>
                    <div className="offset-md-4 col-md-2 text-right">
                        <input type='text' className='form-control' placeholder='Search' onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                    </div>
                    <div className="col-md-12">
                        <DataTable
                            noHeader={true}
                            columns={tableColumns}
                            data={searchQuery == '' ? categoryList : categoryList.filter(category => category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))}
                            pagination={true}
                        />
                        <br />
                        <button className='btn btn-primary' onClick={() => { history.push("/categories/add") }}>Add New Category</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active">Categories</li>
            </ol>
            <div className='row'>
                <div className="col-md-12">
                    <h4>All Categories</h4>
                    {categoryList !== undefined ? categoryData : <div>No categories available</div>}
                </div>
            </div>
        </>
    );
}

export default CategoriesDashboard;