import React, { useEffect, useState } from 'react';
import { downloadImageAPI } from "../../data/services/observation.service";
import { Modal } from 'react-bootstrap'

const ObservationImage = ({ observationId, fileName }) => {

    const [imgSource, setImgSource] = useState(undefined);

    const downloadImage = async (id, name) => {
        let response = await downloadImageAPI({ siteManagementId: id, fileName: name });
        setImgSource(URL.createObjectURL(response.data));
    }

    useEffect(() => {
        if (observationId !== undefined && fileName !== undefined) {
            downloadImage(observationId, fileName)
        }
    }, [observationId, fileName])

    const [show, setShow] = useState(false);

    return (
        <>
            <button onClick={e => { e.preventDefault(); setShow(true)}} className='btn btn-link'>
                {imgSource ? <img alt='observation' src={imgSource} style={{ objectFit: 'cover', height: '120px', width: '100%' }}></img> : ''}
            </button>
            <Modal onHide={(e) => { setShow(false) }} show={show}>
                <Modal.Header closeButton>
                    Image
                </Modal.Header>
                <Modal.Body>
                    {imgSource ? <img alt='observation' src={imgSource} style={{ objectFit: 'cover', height: '100%', width: '100%' }}></img> : ''}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ObservationImage;