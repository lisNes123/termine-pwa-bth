/*Zweites Formular, um weitere Daten zum Termin einzutragen*/

import React from 'react';
import { Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ContaktPicker from './ContactPicker';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';




const Termine = () => {

    const location = useLocation();
    const navigate = useNavigate();




    const selectedDateStart = new Date(location.state.selectedDate);

    console.log("Date in Termine:", selectedDateStart);

    const [dateStart, setDateStart] = useState(selectedDateStart ?? ""); //angeklicktes Datum im Kalender wird hier übernommen
    const [dateEnd, setDateEnd] = useState(selectedDateStart ?? "");

    const [contacts, setContacts] = useState([]);


    //test
    const passContacts = (contactData) => {

        console.log("contactDataNEU", contactData)

        setContacts(contactData);
        console.log("Contacts", contacts)
    };


    console.log(dateEnd);

    //Speichern der übergebenen Input-Values aus Formular "Basisdaten" in neuen Konstanten
    const title = location.state.title;
    const subtitle = location.state.subtitle;
    const category = location.state.category;
    const veranstalter = location.state.veranstalter;
    const ort = location.state.ort;
    const ortsbeschreibung = location.state.ortsbeschreibung;
    const anreisser = location.state.anreisser;
    const beschreibung = location.state.beschreibung;
    const interneInfos = location.state.interneInfos;
    const imageBlob = location.state.blobImage;
    const imageFile = location.state.fileImage;

    console.log("BLOB", imageBlob);
    console.log("FILE", imageFile);

    const [image, setImage] = useState("");

    console.log("IMAGE URL ENDE ", image); //richtig

    const [visible, setVisible] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const errorText = <div className='event-unsuccessful p-2'><FontAwesomeIcon size='lg' icon={faTriangleExclamation} /> <p>Beim Erstellen des Termins ist ein Fehler aufgetreten</p></div>;

    //Nach Klick auf "erstellen" Button wird gerade hinzugefügter Termin angezeigt

    const addImage = () => {
        if (imageBlob === "") {
            setImage(imageFile)
        }
        if (imageFile === "") {
            setImage(imageBlob)
        }
        setVisible(!visible);
    }


    const routeToTerminvorschau = async () => {

        await addImage(); //-> geht leider nicht 


        //Termindaten in Datenbank firestore speichern
        try {
            const docRef = await addDoc(collection(db, "termine"), {
                // id: doc.id,
                titel: title,
                untertitel: subtitle,
                kategorie: category,
                veranstalter: veranstalter,
                ort: ort,
                ortsbeschreibung: ortsbeschreibung,
                anreisser: anreisser,
                beschreibung: beschreibung,
                interneInfos: interneInfos,

                startDatum: dateStart,
                endeDatum: dateEnd,
                vorschaubild: image,
                createdAt: serverTimestamp(),
                allDay: false,
                kontakte: contacts


            });
            console.log("Document ID: ", docRef.id);

            let path = '/termin/terminvorschau';
            navigate(path);
            console.log("ContactsArrayTermine", contacts);

            Notification.requestPermission((permission) => {
                navigator.serviceWorker.ready.then(() => {
                    const notifyMe = permission === 'granted'
                    navigator.serviceWorker.controller.postMessage({
                        type: 'EVENT_ADDED',
                        notifyMe,
                    })
                })
            })

        } catch (error) {
            console.error("Error adding document: ", error);

            setErrorMsg(errorText);

        }

    }

    console.log(image); //passt


    const backToBasisdaten = () => {

        let path = '/termin/basisdaten';
        navigate(path, { state: { title, subtitle, category, veranstalter, ort, ortsbeschreibung, anreisser, beschreibung, interneInfos, image } });

    }



    return (
        <div className="home">

            <h2>Termin anlegen</h2>




            <Container>

                <Row>
                    <Col sm={12} md={12} lg={5} xl={5} >

                        <div className="breadcrumbs mt-4 mb-4 p-2">
                            <Breadcrumb>
                                <Breadcrumb.Item onClick={backToBasisdaten}>Basisdaten</Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Termine
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <Form>

                            <Row className="mb-3">
                                <Form.Label>Beginnt am</Form.Label>
                                <Form.Group as={Col}>
                                    <DateTimePicker
                                        defaultValue={new Date()}
                                        className="w-3/5"
                                        value={dateStart}
                                        minDate={new Date()}
                                        onChange={date => setDateStart(date)}
                                        includeTime
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Label>Endet am</Form.Label>
                                <Form.Group as={Col}>
                                    <DateTimePicker
                                        defaultValue={new Date()}
                                        className="w-3/5"
                                        value={dateEnd}
                                        minDate={new Date()}
                                        onChange={date => setDateEnd(date)}

                                    />
                                </Form.Group>
                            </Row>


                            <Row className="mt-4 mb-3">

                                <Form.Label><b>Kontaktpersonen hinzufügen</b></Form.Label>
                                <ContaktPicker passContacts={passContacts} />

                            </Row>


                            <div className='mb-3'>{errorMsg}</div>

                            <div className='d-flex flex-nowrap mt-2'>
                                <Button className='btn1 me-3' type='button' onClick={addImage}>1. Termindaten speichern</Button>

                                {visible &&
                                    <Button className='btn1' type='button' onClick={routeToTerminvorschau}>2. Termin erstellen</Button>
                                }
                            </div>

                        </Form>
                    </Col>
                    <Col sm={12} md={12} lg={7} xl={7} >
                    </Col>
                </Row>

            </Container>

        </div>
    );
}

export default Termine;