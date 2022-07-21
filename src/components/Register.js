/*Registrierungsseite, neuen Nutzer hinzufügen */

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

//Context für Authentication einbinden
import { useAuth } from "../context/AuthContext";


function Register() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const navigate = useNavigate();

    const auth = useAuth();

    //State-Hooks zur Form-Validation
    const [checkName, setCheckName] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    
    //eslint-disable-next-line
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //Funktion zur Überprüfung der Eingaben im Formular (Emailformat und Passwortlänge)
    const checkValue = () => {
        
        if(nameValue === ""){
            setCheckEmail("");
            setCheckPassword("");
            setCheckName("Gib einen Namen ein");
            nameInput.current.focus();
        } else if (emailValue === "" || !emailRegex.test(emailValue)) {
            setCheckPassword("");
            setCheckName("");
            setCheckEmail("Gib eine gültige E-Mail-Adresse ein");
            emailInput.current.focus();
        } else if (passwordValue === "" || (passwordValue.length < 5)) {
            setCheckName("");
            setCheckEmail("");
            setCheckPassword("Gib ein Passwort mit mindestens 6 Zeichen ein");
            passwordInput.current.focus();
        } else {
            setCheckPassword("");
            auth.signup({name: nameValue, email: emailValue, password: passwordValue, callback: () => navigate("/") });
                            setNameValue("");
                            setEmailValue("");
                            setPasswordValue("");
        }
      };

    return (
        <div className="register">
            <h2 className="mb-4">Registrieren</h2>
            <Container className="register__container">
                <Row>
                    <Col sm={12} md={8} lg={4} xl={4}>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            checkValue();
                        }}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    ref={nameInput}
                                    type="text"
                                    className="register__textBox"
                                    value={nameValue}
                                    onChange={(e) => setNameValue(e.target.value)}
                                    placeholder="Name">
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    ref={emailInput}
                                    type="text"
                                    className="register__textBox"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    placeholder="E-mail Adresse">
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    ref={passwordInput}
                                    type="password"
                                    className="register__textBox"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    placeholder="Passwort">
                                </Form.Control>
                            </Form.Group>
                            
                            {/* Ausgabe von Error-Messages bei Validation */}
                            <p className="form-validation">
                            { checkName } 
                            { checkEmail }
                            { checkPassword }
                            </p>

                            <Button className="btn1 register__btn mb-3" type="submit">
                                Registrieren
                            </Button>
                        </Form>

                        <div>
                            Du hast schon einen Account? <Link to="/login" className="login-link">Login</Link>
                        </div>
                    </Col>
                    <Col sm={12} md={4} lg={8} xl={8}></Col>
                </Row>

            </Container>
        </div>
    );
}

export default Register;