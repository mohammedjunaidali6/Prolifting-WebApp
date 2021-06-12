import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap';

import { useSelector } from "react-redux";
import './Alerts.scss'

const Alerts = () => {
    let { infoMessage, successMessage, dangerMessage } = useSelector(state => state.alertReducer);

    let [successAlertShown, setSuccessAlertVisibility] = useState(false)
    let [dangerAlertShown, setDangerAlertVisibility] = useState(false)
    let [infoAlertShown, setInfoAlertVisibility] = useState(false)

    useEffect(() => {
        if (dangerMessage !== undefined) {
            setDangerAlertVisibility(true)
            setTimeout(() => {
                setDangerAlertVisibility(false)
            }, 2000)
        }
    }, [dangerMessage])
    
    useEffect(() => {
        if (successMessage !== undefined) {
            setSuccessAlertVisibility(true)
            setTimeout(() => {
                setSuccessAlertVisibility(false)
            }, 2000)
        }
    }, [successMessage])

    useEffect(() => {
        if (infoMessage !== undefined) {
            setInfoAlertVisibility(true)
            setTimeout(() => {
                setInfoAlertVisibility(false)
            }, 2000)
        }
    }, [infoMessage])

    const alerts = (
        <div className='alerts'>
            {dangerAlertShown ? (<Alert variant='danger' dismissible onClose={() => { setDangerAlertVisibility(false) }}>
                {dangerMessage?.message}
            </Alert>) : ""}

            {successAlertShown ? <Alert variant='success' dismissible onClose={() => { setSuccessAlertVisibility(false) }}>
                {successMessage?.message}
            </Alert> : ""}

            {infoAlertShown ? <Alert variant='info' dismissible onClose={() => { setInfoAlertVisibility(false) }}>
                {infoMessage?.message}
            </Alert> : ""}
        </div>
    )

    return alerts
}

export default Alerts