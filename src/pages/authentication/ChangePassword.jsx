import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Card, Button, Form, FormControl, InputGroup, Container, Row, Col } from 'react-bootstrap';
import queryString from 'query-string'

import { useSelector, useDispatch } from "react-redux";
import { resetPasswordWithToken } from "../../data/reducers/user-management.reducer";
import { errorMessage } from "../../data/reducers/alert.reducer";

import brandLogo from "../../assets/images/logo-wide.png"
import "./Login.scss";

const ChangePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const authInfo = useSelector(state => state.authReducer);

    const email = queryString.parse(location.search).email
    const token = queryString.parse(location.search).token

    // state
    const [credentials, setCredentials] = useState({ email })

    const resetPassword = async () => {
        try {
            let response = await dispatch(resetPasswordWithToken({credentials, token}));
            if (response.error) {
                console.log(response.error);
                dispatch(errorMessage(response.error.message));
            }
            else {
                history.push('/')
            }
        }
        catch (e) {
            console.log(e);
            dispatch(errorMessage(e));
        }
    }

    return (
        <Container fluid className="login-page">
            {
                authInfo.loading &&
                <div className="loading-overlay">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    <div className="text-white h3">
                        Processing..
                    </div>
                </div>
            }
            <Row>
                <Col style={{
                    display: "flex",
                    height: "100vh",
                    background: 'white'
                }}>
                    <div className="center">
                        <img src={brandLogo} alt="background" height="95" weight="70"></img>
                    </div>
                </Col>
                <Col className="login-bgimage" style={{ padding: '0  ' }}>
                    <div className="gradient">
                        <div className="loginform">
                            <h2>Forgot Password</h2>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" name="email" value={credentials?.email} disabled />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter New Password" name="password" onChange={(e) => { setCredentials({...credentials, password: e.target.value})}} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" name="password" onChange={(e) => { setCredentials({...credentials, confirmPassword: e.target.value})}} />
                                </Form.Group>
                                <Button className="login-btn" variant="primary" onClick={() => { 
                                        resetPassword();
                                    }} style={{ marginTop: '1.5rem' }}>
                                    Reset Password
                                </Button>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangePassword;