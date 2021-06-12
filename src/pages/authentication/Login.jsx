import React, { useState } from "react";
import { Card, Button, Form, FormControl, InputGroup, Container, Row, Col } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import { loginUser } from "../../data/reducers/auth.reducer";

import brandLogo from "../../assets/images/logo-wide.png"
import "./Login.scss";
import { Link } from "react-router-dom";
import { errorMessage } from "../../data/reducers/alert.reducer";

const Login = () => {

    const dispatch = useDispatch();

    // state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            let response = await dispatch(loginUser({ username, password }));
            if (response.error) {
                dispatch(errorMessage(response.error.message));
            }
        }
        catch (e) {
            console.log(e);
            dispatch(errorMessage(e))
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Container fluid className="login-page">
            {
                loading &&
                <div className="loading-overlay">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    <div className="text-white h3">
                        Signing You In..
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
                            <h2>Sign In</h2>
                            <Form onSubmit={() => {
                                login();
                            }}>
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>
                                <Button type='submit' className="login-btn" variant="primary" onClick={(e) => {
                                    e.preventDefault(); login();
                                }} style={{ marginTop: '1.5rem' }}>
                                    Login
                                </Button>

                                <Row>
                                    <Col>
                                        <Form.Group style={{ marginTop: '0.8rem' }}>
                                            <div><Link to='/forgot-password' className="forgot-pwd">Forgot Password?</Link></div>
                                        </Form.Group>
                                    </Col>
                                    {/* <Col className='text-right'>
                                        <Form.Group style={{ marginTop: '0.8rem' }}>
                                            <div><a href="#" onClick={() => { setUserType(userType == 'Doctor' ? 'Patient' : 'Doctor') }} className="forgot-pwd">Looking for {(userType == 'Patient') ? (<span>Doctor</span>) : (<span>Patient</span>)} Login?</a></div>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;