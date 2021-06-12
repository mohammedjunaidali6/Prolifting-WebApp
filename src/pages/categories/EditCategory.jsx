import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { useSelector, useDispatch } from 'react-redux'
import { getCategoryById, updateCategory, deleteCategory } from "../../data/reducers/category.reducer";
import { errorMessage, successMessage } from '../../data/reducers/alert.reducer'

const EditCategory = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const category = useSelector(state => state.categoryReducer)?.selectedCategory;

    const categoryId = queryString.parse(location.search).categoryId

    const [categoryLocal, setCategory] = useState(null)

    useEffect(() => {
        dispatch(getCategoryById(categoryId));
    }, [categoryId])

    useEffect(() => {
        if (category !== undefined) {
            setCategory(category)
        }
    }, [category])

    const update = async () => {
        try {
            let response = await dispatch(updateCategory({ id: categoryId, categoryName: categoryLocal.categoryName }));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/categories');
                dispatch(successMessage('Category deleted successfully!'));
            }
        } catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    const del = async () => {
        try {
            let response = await dispatch(deleteCategory(categoryId));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/categories');
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
                <li className="breadcrumb-item"><Link to='/categories'>Categories</Link></li>
                <li className="breadcrumb-item active">View Category</li>
            </ol>
            <div className='row'>
                <div className='col-md-12'>
                    <h2>View Category Details</h2>
                    <div>See and modify details of a category</div>
                    <br />
                    <div className='card'>
                        <div className='card-body'>
                            <form className='row form'>
                                <div className='col-md-4'>
                                    <div className='form-group'>
                                        <label>Category Name</label>
                                        <input className='form-control' value={categoryLocal?.categoryName} placeholder='Category Name' onChange={(e) => { setCategory({ ...categoryLocal, categoryName: e.target.value }) }}></input>
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
                    <button className='btn btn-danger' onClick={(e) => { e.preventDefault(); del(); }}>Delete Category</button>
                </div>
            </div>
        </>
    )
}

export default EditCategory;