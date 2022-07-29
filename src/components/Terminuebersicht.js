/*Component zeigt alle Termine untereinander sortiert nach "zuletzt hinzugefügt"*/

import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase/config';
import { Container, Row, Col, Button } from "react-bootstrap";
import { collection, query, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Terminuebersicht = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getValue() {

            const getPostsFromFirebase = [];

            const docRef = collection(db, "termine");
            const q = query(docRef, orderBy("startDatum", "asc"));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                const optionsDate = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' };
                const getDateStart = doc.data().startDatum
                const beginnDatum = getDateStart.toDate().toLocaleDateString('de-DE', optionsDate);
                const getDateEnd = doc.data().endeDatum
                const endeDatum = getDateEnd.toDate().toLocaleDateString('de-DE', optionsDate);

                getPostsFromFirebase.push({
                    ...doc.data(),
                    key: doc.id,
                    dateStart: beginnDatum,
                    dateEnd: endeDatum,
                });
                setPosts(getPostsFromFirebase);

            });
        }
        getValue();

    }, []);

    //Nach Button-Klick gelangt man auf die Detailseite des Termins
    function routeToTerminDetailseite(postId) {
        let path = '/termindetails';
        const docId = postId;
        navigate(path, { state: { docId } });
    }

    return (
        <div className="terminvorschau">

            <h2 className="mb-4">Terminübersicht</h2>
            <h6>Termine sind nach Startdatum geordnet</h6>

            {posts.length > 0 ? (
                posts.map((post) =>
                    <div key={post.key}>

                        <div className="termin-block">
                            <Container>
                                <Row className="terminListenEintrag">
                                    <h4 className="mb-3"><b>{post.titel}</b></h4>
                                    <Col sm={12} md={4} lg={4} xl={4} className="uebersicht uebersicht-image pt-3 pb-3 d-flex align-items-center">
                                        <img className="vorschaubild" src={post.vorschaubild} alt="Vorschaubild wurde nicht hinterlegt" />
                                    </Col>
                                    <Col sm={12} md={6} lg={6} xl={6} className="uebersicht uebersicht-infos d-flex align-items-center">
                                        <Container>
                                            <Row className="terminuebersicht-row"><p><b>{post.dateStart} Uhr - {post.dateEnd} Uhr</b></p></Row>
                                            <Row className="terminuebersicht-row"><p>{post.kategorie}</p></Row>
                                            <Row className="terminuebersicht-row"><p>{post.anreisser}</p></Row>
                                            <Row><p>{post.ort}</p></Row>
                                        </Container>
                                    </Col>
                                    <Col sm={12} md={2} lg={2} xl={2} className="uebersicht-btn d-flex justify-content-center align-items-center flex-wrap">
                                        <Button className="btn1 mt-3 mb-3 btn-termin p-2" size="sm" onClick={() => routeToTerminDetailseite((post.key))}>zum Termin</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                    </div>)
            ) : <h5 className="mt-4">keine Einträge</h5>}

        </div>

    );
}

export default Terminuebersicht;