import React, { useState } from "react";
import { Card, Button, Form, FormControl, InputGroup, Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../data/reducers/user-management.reducer";

import brandLogo from "../../assets/images/logo-wide.png"
import "./Login.scss";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const authInfo = useSelector(state => state.authReducer);

    // state
    const [email, setEmail] = useState("")

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
                                    <Form.Control type="text" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Button className="login-btn" variant="primary" onClick={() => { 
                                        dispatch(forgotPassword({ email }));
                                    }} style={{ marginTop: '1.5rem' }}>
                                    Forgot Password
                                </Button>

                                <Row>
                                    <Col className='text-white my-3'>
                                        You will receive a reset link on your email if there is a account with the email mentioned here.
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword;