/*Login Seite, erscheint bei erstem Aufruf*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

//Context für Authentication einbinden
import { useAuth } from "../context/AuthContext";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const auth = useAuth();

    return (
        <div className="login">
            <h2 className="mb-4">Login</h2>
            <Container className="login__container">

                <Row>
                    <Col sm={12} md={8} lg={4} xl={4}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            auth.signin({
                                email: email,
                                password: password,
                                callback: () => navigate("/"),
                            });
                        }}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    className="login__textBox"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-Mail-Adresse">
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    className="login__textBox"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Passwort">
                                </Form.Control>
                            </Form.Group>

                            {/* Error-Message anzeigen, wenn Password falsch */}
                            <p className="form-validation">{ auth.errorAuth }</p>

                            <Button
                                className="btn1 login__btn mb-3"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Form>
                        
                        <div>
                            Noch keinen Account? <Link to="/register" className="login-link">Registriere</Link> dich hier.
                        </div>
                    </Col>
                    <Col sm={12} md={4} lg={8} xl={8}></Col>
                </Row>

            </Container>
        </div>
    );
}

export default Login;