/*Termin, nachdem dieser hinzugefügt wurde anzeigen*/

import { useEffect, useState } from "react";
import { db } from '../firebase/config';
import { Container, Row, Col, Button, Breadcrumb } from "react-bootstrap";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ICalendarLink from "react-icalendar-link";

const Terminvorschau = () => {

    const [posts, setPosts] = useState([]);

    //Daten des zuletzt hinzugefügten Termin-Dokuments aus DB firestore holen
    useEffect(() => {
        async function fetchData() {

            const getPostsFromFirebase = [];

            const docRef = collection(db, "termine");
            const q = query(docRef, orderBy("createdAt", "desc"), limit(1));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                const title = doc.data().titel;
                const optionsDate = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' };
                const getDateStart = doc.data().startDatum
                const beginnDatum = getDateStart.toDate().toLocaleDateString('de-DE', optionsDate);
                const getDateEnd = doc.data().endeDatum
                const endeDatum = getDateEnd.toDate().toLocaleDateString('de-DE', optionsDate);

                const dateStartICS = getDateStart.toDate();
                const dateEndICS = getDateEnd.toDate();

                getPostsFromFirebase.push({
                    ...doc.data(),
                    key: doc.id,
                    dateStart: beginnDatum,
                    dateEnd: endeDatum,
                    titleEvent: title,
                    dtStartICS: dateStartICS,
                    dtEndICS: dateEndICS,
                });
                setPosts(getPostsFromFirebase);

            });
        }
        fetchData();
    }, []); 


    const navigate = useNavigate();

    const routeToStart = async () => {
        let path = '/';
        navigate(path);
    };

     //Kalender ICS-Datei
     const createICSFile = (start, end, title, ort, beschreibung) => {

        const startICS = start;
        const endICS = end;
        const titleICS = title;
        const descriptionICS = beschreibung;
        const ortICS = ort;

        const event = {
            title: titleICS,
            description: descriptionICS,
            startTime: startICS,
            endTime: endICS,
            location: ortICS,
        };

        return event;
    };

    return (
        <div className="terminvorschau">

            <h2>Terminvorschau</h2>

            {/* Auslesen der Termine-Dokumente aus der DB */}
            {posts.map((post) =>
                <div key={post.key}>

                    <Container>
                        <Row>
                            <Col sm={12} md={12} lg={9} xl={9}>

                                <div className="breadcrumbs mt-4 mb-4 p-2">
                                    <Breadcrumb>
                                        <Breadcrumb.Item active>Terminvorschau</Breadcrumb.Item>
                                    </Breadcrumb>
                                </div>

                                <div className="termindetails p-3">
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Titel</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.titel}</Col>
                                    </Row>
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Termin</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}><b>{post.dateStart} Uhr</b> - <b>{post.dateEnd} Uhr</b></Col>
                                    </Row>
                                    {/* ({post.startTime.toDate()}) - {post.endDate.toDate()} ({post.endTime.toDate()} */}
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Beschreibung</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.beschreibung}</Col>
                                    </Row>
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Veranstaltungsort</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.ort}</Col>
                                    </Row>
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Ortsbeschreibung</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.ortsbeschreibung}</Col>
                                    </Row>
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Veranstalter</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.veranstalter}</Col>
                                    </Row>
                                    <Row className="rowKeyValue">
                                        <Col sm={5} md={5} lg={3} xl={3} className="keys">Interne Informationen</Col>
                                        <Col sm={7} md={7} lg={9} xl={9}>{post.interneInfos}</Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={3} xl={3}>

                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col sm={12} md={12} lg={9} xl={9} className="d-flex justify-content-end">
                                <Button className="btn1 btn-termin me-3">
                                    <ICalendarLink
                                        className="iCal-Link"
                                        filename="terminverwaltung.ics"
                                        event={createICSFile(post.dtStartICS, post.dtEndICS, post.titleEvent, post.ort, post.beschreibung)}
                                    >
                                        <FontAwesomeIcon className='sidebar-icon me-2' icon={faCalendarDays} /> Zum Kalender hinzufügen
                                    </ICalendarLink>
                                </Button>
                                <Button className="btn1" onClick={routeToStart}><FontAwesomeIcon className='sidebar-icon me-2' icon={faCheck} />Fertig</Button>
                            </Col>
                            <Col sm={12} md={12} lg={3} xl={3}></Col>
                        </Row>

                    </Container>

                </div>)}
        </div>

    );
}

export default Terminvorschau;