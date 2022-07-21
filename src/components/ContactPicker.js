import React from 'react';
import { Button, Form } from "react-bootstrap";
import { useState, useRef } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


const ContaktPicker = ({ passContacts }) => {


    const [dataContacts, setDataContacts] = useState([]);

    //console.log("cNamein fun",nameDB);
    console.log("dataContactsOBEN-NEU:", dataContacts);
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


    const enableProp = (cbox) => {
        cbox.current.removeAttribute('disabled');
        //cbox.current.setAttribute('checked', 'checked');

        if (cbName){
            setName(!name);
        }
    }

    const [text, setText] = useState("");

    const contactsNotSupported = <div className='contacts-not-supported p-2'><FontAwesomeIcon size='lg' icon={faTriangleExclamation} /> <p>Das Hinzufügen von Kontakten aus dem lokalen Telefonbuch wird von diesem Endgerät/Browser <b>NICHT</b> unterstützt.</p></div>;
    const contactsSupported = <div className='contacts-supported p-2'><FontAwesomeIcon size='lg' icon={faCircleCheck} /> <p>Das Hinzufügen von Kontakten aus dem lokalen Telefonbuch wird von diesem Endgerät/Browser unterstützt. Wähle unterhalb welche Kontaktinformationen hinzugefügt werden sollen. </p></div>;


    //check if supported, if yes then disable the checkboxes and set to checked 

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
        console.log("Props", props);



        try {
            const contacts = await navigator.contacts.select(props, opts);
            handleResults(contacts);


            //setDataContacts(contactData)
            //console.log("DataContacts zum passen",dataContacts); //passt schon  nicht
            //passContacts(dataContacts);

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
        //console.log(returnedContactdata);

        //return returnedContactdata;

    }

    function renderResults(contacts) {


        contacts.forEach((contact) => {
            //lines muss hier bleiben
            const lines = [];

            if (contact.name) lines.push(`<b>Name:</b> ${contact.name.join(', ')}`);
            if (contact.email) lines.push(`<b>E-mail:</b> ${contact.email.join(', ')}`);
            if (contact.tel) lines.push(`<b>Telefon:</b> ${contact.tel.join(', ')}`);

            lines.push(`<code>${JSON.stringify(contact)}</code>`);
            const li = document.createElement('li');
            li.innerHTML = lines.join('<br>');
            ulResults.current.appendChild(li);

            console.log("contact.email", contact.email);

            //const cName = contact.name; //ist schon ein Array, mit einem eintrag "name"
            //const cEmail = contact.email;
            //const cTel = contact.tel;


            const contactNameArray = contact.name;
            console.log("nameArray", contactNameArray);
            if (contactNameArray) {
                contactNameArray.forEach((contactName) => {
                    if (contactName) {
                        const cNameStelleNull = contactName;
                        setDataContacts(state => [...state, cNameStelleNull]); //geht so 
                        console.log("cnameStelleNull", cNameStelleNull);
                    }
                }
                );
            }



            const contactEmailArray = contact.email;
            console.log("emailArray", contactEmailArray);
            if (contactEmailArray) {
                contactEmailArray.forEach((contactEmail) => {
                    if (contactEmail) {
                        const cEmailStelleNull = contactEmail;
                        setDataContacts(state => [...state, cEmailStelleNull]);
                        console.log("cmail", cEmailStelleNull);
                    }
                }
                );
            }



            const contactTelArray = contact.tel;
            console.log("telArray", contactTelArray);
            if (contactTelArray) {
                contactTelArray.forEach((contactTel) => {
                    if (contactTel) {
                        const cTelStelleNull = contactTel;
                        setDataContacts(state => [...state, cTelStelleNull]);
                        console.log("ctel", cTelStelleNull);
                    }
                }
                );
            }



            // if (contact.name[0]) {
            //     const cNameStelleNull = contact.name[0];
            //     setDataContacts(state => [...state, cNameStelleNull]); //geht so 
            //     console.log("cnameStelleNull", cNameStelleNull);
            // }

            // if (contact.email) {
            //     const cEmailStelleNull = contact.email[0];
            //     setDataContacts(state => [...state, cEmailStelleNull]);
            //     console.log("cmail", cEmailStelleNull);
            // }

            // if (contact.tel) {
            //     const cTelStelleNull = contact.tel[0];
            //     setDataContacts(state => [...state, cTelStelleNull]);
            //     console.log("ctel", cTelStelleNull);
            // }

            // //JEweils noch array durchlaufen lassen pro eigenschaft um zu gucken ob auf [1] oder [2] auch was steht
            // if (contact.name){
            //     const nameArray = [];
            //     contact.name.length > 0 ? ( contact.name.map(prop =>
            //         nameArray.push(prop)
            //     )): console.log("no name");

            //     setDataContacts(state => [...state, nameArray]); //geht so 
            //     console.log("cnameStelleNull",nameArray);
            // }

            // //diese Variante funktioniert nicht, da firebase keine nested Arrays unterstützt 
            // //es können daher keine zwei Tels genommen werden, nur die erste wird gespeichert 

            // if (contact.email){
            //     const emailArray = [];
            //     contact.email.length > 0 ? ( contact.email.map(prop =>
            //         emailArray.push(prop)
            //     )): console.log("no email");

            //     setDataContacts(state => [...state, emailArray]); //geht so 
            //     console.log("cemailStelleNull",emailArray);
            // }



            // if (contact.tel){
            //     const telArray = [];
            //     contact.tel.length > 0 ? ( contact.tel.map(prop =>
            //         telArray.push(prop)
            //     )): console.log("no tel");

            //     setDataContacts(state => [...state, telArray]); //geht so 
            //     console.log("ctelStelleNull",telArray);
            // }



            //console.log("contactArray",dataContactArray);


            //setDataContacts(dataContactArray);
            //console.log("dataContactsNeu:",dataContacts);

        });
        const strContacts = JSON.stringify(contacts, null, 2);
        console.log(strContacts);
        //console.log("Lines", lines);

        //test
        //setDataContacts(strContacts);

        //return lines;

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