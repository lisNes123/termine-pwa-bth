/*Formular um Basisdaten zum Termin einzutragen*/

import React from 'react';
import { Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GetMedia from './GetMedia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Basisdaten = () => {

    const navigate = useNavigate();

    //State-Hooks zur Form-Validation
    const [checkTitle, setCheckTitle] = useState("");
    const [checkSubtitle, setCheckSubtitle] = useState("");
    const [checkBeschreibung, setCheckBeschreibung] = useState("");
    const [checkAnreisser, setCheckAnreisser] = useState("");
    const titleInput = useRef(null);
    const subtitleInput = useRef(null);
    const beschreibungInput = useRef(null);
    const anreisserInput = useRef(null);

    //Überprüfen, ob Pflichtfelder ausgefüllt
    //wenn ja, dann werden alle Input-Values an zweites Formular "Termine" weitergegeben
    const routeToTermineForm = () => {
        if (title === "") {
            setCheckSubtitle("");
            setCheckBeschreibung("");
            setCheckAnreisser("");
            setCheckTitle("Gib dem Termin einen Titel");
            titleInput.current.focus();
        } else if (subtitle === "") {
            setCheckTitle("");
            setCheckBeschreibung("");
            setCheckAnreisser("");
            setCheckSubtitle("Gib dem Termin einen Untertitel");
            subtitleInput.current.focus();
        } else if (anreisser === "") {
            setCheckTitle("");
            setCheckSubtitle("");
            setCheckBeschreibung("");
            setCheckAnreisser("Gib einen kurzen Anreißer zum Termin an");
            anreisserInput.current.focus();
        } else if (beschreibung === "") {
            setCheckTitle("");
            setCheckSubtitle("");
            setCheckAnreisser("");
            setCheckBeschreibung("Gib eine kurze Beschreibung zum Termin an");
            beschreibungInput.current.focus();
        } else {
            let path = '/termin/termine';
            navigate(path, { state: { title, selectedDate, subtitle, category, veranstalter, ort, ortsbeschreibung, anreisser, beschreibung, interneInfos, fileImage, blobImage } });
        }
    }

    const location = useLocation();

    const [title, setTitle] = useState(location?.state?.title ?? ""); //verhindert, dass Titelname null ist, wenn Formular nicht über den Kalender aufgerufen wurde
    const [subtitle, setSubtitle] = useState(location?.state?.subtitle ?? ""); //verhindert, dass Daten aus Inputfelder entfernt werden, wenn der Nutzer über den Breadcrumb von Formular zwei zurück auf Formular 1 (Basisdaten) navigiert
    const [category, setCategory] = useState(location?.state?.category ?? "");
    const [veranstalter, setVeranstalter] = useState(location?.state?.veranstalter ?? "");
    const [ort, setOrt] = useState(location?.state?.ort ?? "");
    const [ortsbeschreibung, setOrtsbeschreibung] = useState(location?.state?.ortsbeschreibung ?? "");
    const [anreisser, setAnreisser] = useState(location?.state?.anreisser ?? "");
    const [beschreibung, setBeschreibung] = useState(location?.state?.beschreibung ?? "");
    const [interneInfos, setInterneInfos] = useState(location?.state?.interneInfos ?? "");

    //Ausgewähltes Datum in Kalender in Formular-JS-Format umwandeln, sodass dieses direkt in Formular übernommen werden kann
    const selectedDate = location?.state?.selectedDate ?? new Date().getTime();

    //Vorschaubild Upload
    //in fileImage wird Bild gespeichert, wenn dieses über file-input hochgeladen wurde
    //in blobImage wird Bild gespeichert, wenn dieses über GetMedia (MediaCapture) aufgenommen wurde

    const [fileImage, setFileImage] = useState("");
    const [blobImage, setBlobImage] = useState("");

    const onFileChange = async (e) => {
        const file = e.target.files[0]
        const storageRef = getStorage(firebaseApp)
        const fileRef = ref(storageRef, file.name)
        await uploadBytes(fileRef, file)
        setFileImage(await getDownloadURL(fileRef))

    }
    const passBlobImage = (blobFileURL) => {
        setBlobImage(blobFileURL);
    };


    return (
        <div className="home">

            <h2>Termin anlegen</h2>

            <Container>
                <Row>
                    <Col sm={12} md={12} lg={9} xl={9}>
                        <div className="breadcrumbs mt-4 mb-4 p-3">
                            <Breadcrumb>
                                <Breadcrumb.Item active>Basisdaten</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Titel *</Form.Label>
                                    <Form.Control className="formfield"
                                        ref={titleInput}
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Untertitel *</Form.Label>
                                    <Form.Control
                                        ref={subtitleInput}
                                        type="text"
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Kategorie</Form.Label>
                                <Form.Select
                                    value={category}
                                    onChange={(e) => {
                                        const selectedCategory = e.target.value;
                                        setCategory(selectedCategory);
                                    }}
                                >
                                    <option value="-">-</option>
                                   <option value="Veranstaltungen">Veranstaltungen</option>
                                   <option value="Feste und Feiern">Feste und Feiern</option>
                                   <option value="Workshops">Workshops</option>
                                    <option value="Gottesdienste">Gottesdienste</option>
                                    
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Veranstalter</Form.Label>
                                <Form.Select
                                    value={veranstalter}
                                    onChange={(e) => {
                                        const selectedVeranstalter = e.target.value;
                                        setVeranstalter(selectedVeranstalter);
                                    }}
                                >
                                    <option value="-">-</option>
                                    <option value="Stadt Offenburg">Stadt Offenburg</option>
                                    <option value="Kirchengemeinde">Kirchengemeinde</option>
                                    
                                </Form.Select>
                            </Form.Group>

                            <Row className="mb-3">
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Form.Group>
                                        <Form.Label>Ort / Gebäude</Form.Label>
                                        <Form.Select
                                            value={ort}
                                            onChange={(e) => {
                                                const selectedOrt = e.target.value;
                                                setOrt(selectedOrt);
                                            }}
                                        >
                                            <option value="-">-</option>
                                            <option value="Bildungszentrum">Bildungszentrum</option>
                                            <option value="Kindergarten">Kindergarten</option>
                                            <option value="Gemeindehaus Offenburg">Gemeindehaus Offenburg</option>
                                            <option value="Musterkirche Offenburg">Musterkirche Offenburg</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Form.Group>
                                        <Form.Label>Ortsbeschreibung</Form.Label>
                                        <Form.Control as="textarea"
                                            value={ortsbeschreibung}
                                            onChange={(e) => setOrtsbeschreibung(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>


                            <h4 className='mb-3'>Vorschaubild</h4>
                            <p><FontAwesomeIcon size="lg" icon={faTriangleExclamation} /> Nur eine der zwei Optionen auswählen</p>

                            <Form.Group className="option1 p-3 m-2 mb-3">
                                <Form.Label><b>Option 1:</b> Foto aus dem Album hochladen / Foto mit Gerätekamera aufnehmen</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={onFileChange}
                                    accept="image/*, video/*"
                                // capture="environment"
                                >
                                </Form.Control>
                            </Form.Group>

                            <div className='option2 p-3 m-2 mb-3'>
                                <Form.Label><b>Option 2:</b> Bild direkt in der Anwendung erstellen</Form.Label>
                                <GetMedia passBlobImage={passBlobImage} />
                            </div>

                            <Form.Group className="mb-3">
                                <Form.Label>Anreißer *</Form.Label>
                                <Form.Control as="textarea"
                                    ref={anreisserInput}
                                    value={anreisser}
                                    onChange={(e) => setAnreisser(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Beschreibung *</Form.Label>
                                <Form.Control as="textarea"
                                    value={beschreibung}
                                    onChange={(e) => setBeschreibung(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Interne Informationen</Form.Label>
                                <Form.Control as="textarea"
                                    value={interneInfos}
                                    onChange={(e) => setInterneInfos(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <div className='form-validation'>
                                <p>{checkTitle}</p>
                                <p>{checkSubtitle}</p>
                                <p>{checkBeschreibung}</p>
                                <p>{checkAnreisser}</p>
                            </div>

                            <Button className='btn1' onClick={routeToTermineForm}>weiter</Button>

                        </Form>
                    </Col>
                    <Col sm={12} md={12} lg={3} xl={3} className="ps-5">
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Basisdaten;