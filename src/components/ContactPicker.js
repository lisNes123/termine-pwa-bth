/*Zugriff auf das Telefonbuch für das Hinzufügen von Kontakten als Ansprechpartner zum Termin*/

import React from 'react';
import { Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const ContaktPicker = ({ passContacts }) => {

    const [dataContacts, setDataContacts] = useState([]);
    passContacts(dataContacts);

    const [multiple, setMultiple] = useState(false);

    const toggleMultiple = () => {
        setMultiple(!multiple);
    };

    const [name, setName] = useState(false);

    const toggleName = () => {
        setName(!name);
    };

    const [email, setEmail] = useState(false);

    const toggleEmail = () => {
        setEmail(!email);
    };

    const [tel, setTel] = useState(false);

    const toggleTel = () => {
        setTel(!tel);
    };

    const [visible, setVisible] = useState(false);

    const cbMultiple = useRef(null);
    const cbName = useRef(null);
    const cbEmail = useRef(null);
    const cbTel = useRef(null);
    const openContacts = useRef(null);
    const contactsAvailable = useRef(null);

    const ulResults = useRef(null);
    const preResults = useRef(null);

    //Überprüfen welche Eigenschaften zum Kontakt unterstützt werden
    const checkProperties = async () => {
        const supportedProperties = await navigator.contacts.getProperties();
        if (supportedProperties.includes('name')) {
            enableProp(cbName);
        }
        if (supportedProperties.includes('email')) {
            enableProp(cbEmail);
        }
        if (supportedProperties.includes('tel')) {
            enableProp(cbTel);
        }

    }

    //Switches aktivieren, wenn Eigenschaften unterstützt werden
    const enableProp = (cbox) => {
        cbox.current.removeAttribute('disabled');

        if (cbName) {
            setName(!name);
        }
    }

    const [text, setText] = useState("");

    const contactsNotSupported = <div className='contacts-not-supported p-2'><FontAwesomeIcon size='lg' icon={faTriangleExclamation} /> <p>Das Hinzufügen von Kontakten aus dem lokalen Telefonbuch wird von diesem Endgerät/Browser <b>NICHT</b> unterstützt.</p></div>;
    const contactsSupported = <div className='contacts-supported p-2'><FontAwesomeIcon size='lg' icon={faCircleCheck} /> <p>Das Hinzufügen von Kontakten aus dem lokalen Telefonbuch wird von diesem Endgerät/Browser unterstützt. Wähle unterhalb welche Kontaktinformationen hinzugefügt werden sollen. </p></div>;

    //Überprüfen ob Zugriff auf Telefon von Gerät/Browser unterstützt wird.
    const checkContacts = () => {
        const supported = ('contacts' in navigator && 'ContactsManager' in window);

        if (supported) {
            checkProperties();
            setText(contactsSupported);
            setVisible(!visible);

        } else {
            setText(contactsNotSupported);
        }
    }


    const requestContacts = async () => {

        const props = [];
        if (cbName.current.checked) props.push('name');
        if (cbEmail.current.checked) props.push('email');
        if (cbTel.current.checked) props.push('tel');

        const opts = { multiple: cbMultiple.current.checked };

        try {
            const contacts = await navigator.contacts.select(props, opts);
            handleResults(contacts);

        } catch (ex) {
            ulResults.current.classList.toggle('error', true);
            ulResults.current.classList.toggle('success', false);
            ulResults.current.innerText = ex.toString();

        }

    }


    function handleResults(contacts) {
        ulResults.current.classList.toggle('success', true);
        ulResults.current.classList.toggle('error', false);
        ulResults.current.innerHTML = '';
        renderResults(contacts);
    }

    //Ausgewählte Kontakte ausgeben und in Konstante speichern, damit Kontakte an das Termine-Formular übergeben werden können
    function renderResults(contacts) {

        contacts.forEach((contact) => {

            const lines = [];

            if (contact.name) lines.push(`<b>Name:</b> ${contact.name.join(', ')}`);
            if (contact.email) lines.push(`<b>E-mail:</b> ${contact.email.join(', ')}`);
            if (contact.tel) lines.push(`<b>Telefon:</b> ${contact.tel.join(', ')}`);

            lines.push(`<code>${JSON.stringify(contact)}</code>`);
            const li = document.createElement('li');
            li.innerHTML = lines.join('<br>');
            ulResults.current.appendChild(li);

            const contactNameArray = contact.name;
            if (contactNameArray) {
                contactNameArray.forEach((contactName) => {
                    if (contactName) {
                        const cNameStelleNull = contactName;
                        setDataContacts(state => [...state, cNameStelleNull]);
                    }
                }
                );
            }

            const contactEmailArray = contact.email;
            if (contactEmailArray) {
                contactEmailArray.forEach((contactEmail) => {
                    if (contactEmail) {
                        const cEmailStelleNull = contactEmail;
                        setDataContacts(state => [...state, cEmailStelleNull]);
                    }
                }
                );
            }

            const contactTelArray = contact.tel;
            if (contactTelArray) {
                contactTelArray.forEach((contactTel) => {
                    if (contactTel) {
                        const cTelStelleNull = contactTel;
                        setDataContacts(state => [...state, cTelStelleNull]);
                    }
                }
                );
            }

        });
    }

    return (

        <div>
            <Form>
                <Form.Label className='me-3'>Überprüfen, ob Zugriff auf Telefonbuch möglich:</Form.Label>
                <Button ref={contactsAvailable} className='btn1 me-3' type='button' onClick={checkContacts}>Zugriff prüfen</Button>

                <div className='mt-3'>{text}</div>

                <div className='kontakt-optionen p-2 mt-3'>
                    <Form.Group className="mb-3">
                        <Form.Check
                            ref={cbMultiple}
                            type="switch"
                            label="Mehrere Kontakte auswählen"
                            id="custom-switch"
                            onChange={toggleMultiple}
                            checked={multiple}

                        >
                        </Form.Check>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            ref={cbName}
                            type="switch"
                            label="Name"
                            id="custom-switch"
                            onChange={toggleName}
                            checked={name}
                            disabled

                        >
                        </Form.Check>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            ref={cbEmail}
                            type="switch"
                            label="E-Mail"
                            id="custom-switch"
                            onChange={toggleEmail}
                            checked={email}
                            disabled

                        >
                        </Form.Check>
                    </Form.Group>

                    <Form.Group>
                        <Form.Check
                            ref={cbTel}
                            type="switch"
                            label="Telefon"
                            id="custom-switch"
                            onChange={toggleTel}
                            checked={tel}
                            disabled

                        >
                        </Form.Check>
                    </Form.Group>

                    {visible &&
                        <Button ref={openContacts} className='btn1 mt-3' type='button' onClick={requestContacts}>Telefonbuch öffnen</Button>
                    }

                </div>

            </Form>

            <ul id="results" ref={ulResults}>
            </ul>
            <pre id="rawResults" ref={preResults}>
            </pre>

        </div>
    );
}

export default ContaktPicker;