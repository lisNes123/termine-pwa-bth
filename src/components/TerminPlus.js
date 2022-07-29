/*Startseite um neuen Termin anzulegen*/

import React, { useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, getDocs, where, writeBatch } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";

const TerminPlus = () => {

    useEffect(() => {

        //Funktion für das Löschen von alten Terminen
        async function deleteOutdatedDocs() {

            const now = new Date();
            const docsRef = collection(db, "termine");
            const outdatedDocs = query(docsRef, where("startDate", "<", now));
            const outdatedPosts = await getDocs(outdatedDocs);

            const batch = writeBatch(db);
            outdatedPosts.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();

        }
        deleteOutdatedDocs();

    }, []);




    return (
        <div className="home">

            <Container className="login__container">
                <Row>
                    <Col sm={12} md={12} lg={4} xl={6} className="d-flex flex-column align-items-center">
                        <Link to="/termin/basisdaten">
                            <FontAwesomeIcon className='plus-icon' icon={faCirclePlus} size="3x" beatFade />
                        </Link>
                        <span className='mt-3'>Termin anlegen</span>
                    </Col>
                    <Col sm={12} md={12} lg={8} xl={6}></Col>
                </Row>
            </Container>

        </div>

    );
}

export default TerminPlus;