/*Zeigt Termindetails nachdem auf Termin in Kalender  oder auf "zum Termin"-Button in Terminübersicht geklickt wurde*/

import { useEffect, useState } from "react";
import { db } from '../firebase/config';
import { Container, Row, Col, Button } from "react-bootstrap";
import { getDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import ICalendarLink from "react-icalendar-link";
import PopUpDelete from "./PopUpDelete";

const TerminDetail = () => {

    const [postEvent, setPostEvent] = useState({});
    const location = useLocation();

    const [visible, setVisible] = useState(false);

    const eventId = location.state.docId;  //hier steht docId des Termins, der in Übersicht ausgewählt wurde

    console.log(eventId);

    console.log(postEvent);

    const [data, setData] = useState([]);

    console.log("data",data);


    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "termine", eventId);
            const docSnap = await getDoc(docRef);
            var selectedDocument = "";

            const title = docSnap.data().titel;
            const ort = docSnap.data().ort;
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' };
            const getDateStart = docSnap.data().startDatum
            const beginnDatum = getDateStart.toDate().toLocaleDateString('de-DE', optionsDate);
            const getDateEnd = docSnap.data().endeDatum
            const endeDatum = getDateEnd.toDate().toLocaleDateString('de-DE', optionsDate);

            const dateStartICS = getDateStart.toDate();
            const dateEndICS = getDateEnd.toDate();

            console.log("localDateBeginn", beginnDatum);
            console.log("toDateBeginn", dateStartICS);

            console.log(title);

            //speichert Array mit Kontaktdaten in useState data (so kann unten durch data gemapt werden)
            setData((docSnap.data().kontakte.map((prop) => prop))); 
            

            selectedDocument = {
                ...docSnap.data(),
                key: docSnap.id,
                dateStart: beginnDatum,
                dateEnd: endeDatum,
                titleEvent: title,
                dtStartICS: dateStartICS,
                dtEndICS: dateEndICS,
                ortEvent: ort
            };


            setPostEvent(selectedDocument);

            console.log("Title Event: ", postEvent.titleEvent);
            console.log("Title Event: ", postEvent.key);

        }
        fetchData();
    }, [eventId, postEvent.key, postEvent.titleEvent]); //needed to add dependencies in order to avoid an infinite loop 


   // const [currentEvent, setCurrentEvent] = useState();

    //Bei Klick auf Termin löschen wird Termin aus DB entfernt und erscheint somit nicht mehr in der Terminübersicht oder im Kalender
    const deleteEvent = () => {
        //const currentEvent = await getDoc(doc(db, "termine", eventId));
        //setCurrentEvent(currentEvent);

        // let path = '/termin-loeschen';
        // const currentEvent = postEvent.key;
        // navigate(path, { state: { currentEvent } });

        setVisible(true);


        // await deleteDoc(doc(db, "termine", eventId));
        // let path = '/terminuebersicht';
        // navigate(path);
        // notifyDeleted();
    };



    //Test ICAL neu

    const createICSFile = (start, end, title, ort, beschreibung) => {

        const startICS = start;
        console.log("Start", startICS);
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

            <h2>Termin - Detailseite</h2>

            <Container className="mt-5">
                <Row>
                    <Col sm={12} md={12} lg={9} xl={9}  className="uebersicht termindetails">

                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Titel</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.titleEvent}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Termin</Col>
                            <Col sm={7} md={7} lg={9} xl={9}><b>{postEvent.dateStart} Uhr</b> - <b>{postEvent.dateEnd} Uhr</b></Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Kategorie</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.kategorie}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Beschreibung</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.beschreibung}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Veranstaltungsort</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.ort}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Ortsbeschreibung</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.ortsbeschreibung}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Veranstalter</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.veranstalter}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Interne Informationen</Col>
                            <Col sm={7} md={7} lg={9} xl={9}>{postEvent.interneInfos}</Col>
                        </Row>
                        <Row className="rowKeyValue">
                            <Col sm={5} md={5} lg={3} xl={3} className="keys">Ansprechpartner</Col>
                            
                            <Col sm={9}>{data.length > 0 ? ( data.map(prop =>
                                <div key={prop}>
                                    {prop}
                                </div>
                            )): <div>keine Ansprechpartner</div>}
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={12} lg={3} xl={3}></Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={12} md={12} lg={9} xl={9} className="d-flex justify-content-end">

                        <Button className="btn1 btn-termin me-3">
                            <ICalendarLink
                                className="iCal-Link"
                                filename="terminverwaltung.ics"
                                event={createICSFile(postEvent.dtStartICS, postEvent.dtEndICS, postEvent.titleEvent, postEvent.ortEvent, postEvent.beschreibung)}
                            >
                                <FontAwesomeIcon className='sidebar-icon me-2' icon={faCalendarDays} /> Zum Kalender hinzufügen
                            </ICalendarLink>
                        </Button>
                        <Button className="btn1 btn-termin" onClick={deleteEvent}><FontAwesomeIcon className='sidebar-icon me-2' icon={faTrashCan} />Termin löschen</Button>
                    </Col>
                    <Col sm={12} md={12} lg={3} xl={3}></Col>
                </Row>


                {visible &&
                        <PopUpDelete currentEvent = {eventId} closeWindow={()=>setVisible(false)}/>
                    }


            </Container>


            

        </div>

    );
}

export default TerminDetail;