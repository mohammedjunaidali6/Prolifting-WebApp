import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

const SingleInputModal = ({ modalTitle, inputFieldLabel, placeholder, isVisible, onSubmit, onCancel }) => {

    const [value, setValue] = useState('')
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(isVisible)
    }, [isVisible])

    return (
        
        <Modal show={show} onHide={() => { onCancel() }}>
        <Modal.Header closeButton>
            {modalTitle}
        </Modal.Header>
        <Modal.Body>
            <form className='form' onSubmit={(e) => { e.preventDefault(); onSubmit(value); }}>
                <div className="form-group">
                    <label>{inputFieldLabel}</label>
                    <input 
                        className='form-control'
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => { setValue(e.target.value); }}>                                
                    </input>
                </div>
                <input type='submit' value='Submit' className='btn btn-primary'></input>
                &nbsp;&nbsp;
                <input type='button' value='Cancel' className='btn btn-danger' onClick={() => { onCancel() }}></input>
            </form>
        </Modal.Body>
        </Modal>  

    )
}
        
       
    
        
      
    

export default SingleInputModal