import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { createCategory } from "../../data/reducers/category.reducer";

import { errorMessage, successMessage } from '../../data/reducers/alert.reducer';

const AddCategory = () => {
    const dispatch = useDispatch();

    const history = useHistory()
    const [category, setCategory] = useState({})

    const create = async () => {
        try {
            let response = await dispatch(createCategory(category));
            if (response.error) {
                dispatch(errorMessage(response.error.message))
            }
            else {
                history.push('/categories');
                dispatch(successMessage('Category added successfully!'));
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e))
        }
    }

    return (
        <>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item"><Link to='/categories'>Categories</Link></li>
                <li className="breadcrumb-item active">Add New Category</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Add New Category</h2>
                    <div>Fill up details for new category</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <div className='container-fluid form'>
                                <section className='my-3 row'>
                                    <div className='col-md-12'>
                                        <h4>Basic Category Details</h4>
                                        <p>Category information</p>
                                    </div>
                                    <div className='col-md-12 row'>
                                        <div className="col-md-4">
                                            <div className="form-group d-flex flex-column">
                                                <label>Category Name</label>
                                                <input className='form-control' placeholder='Category Name' onChange={(e) => { setCategory({ ...category, categoryName: e.target.value }) }}></input>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 my-3'>
                    <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); console.log('creating category...'); create(); }}>Create</button>
                        &nbsp;&nbsp;
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); history.push('/categories'); }}>Discard</button>
                </div>
            </div>
        </>
    )
}

export default AddCategory;