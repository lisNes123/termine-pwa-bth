/*PopUp-Fenster: überprüft nach Klick auf Termin löschen, ob Termin wirklich gelöscht werden soll*/

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config';


const PopUpDelete = (props) => {

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");

    const currentEventId = props.currentEvent;

    const deleteCurrentEvent = async () => {

        await deleteDoc(doc(db, "termine", currentEventId))
            .then(() => {
                let path = '/terminuebersicht';
                navigate(path);
                notifyDeleted();
            })
            .catch(error => {
                console.log(error);
                setErrorMsg(error);
            });

    };

    const notifyDeleted = () => {

        Notification.requestPermission((permission) => {
            navigator.serviceWorker.ready.then(() => {
                const notifyMe = permission === 'granted'
                navigator.serviceWorker.controller.postMessage({
                    type: 'EVENT_DELETED',
                    notifyMe,
                })
            })
        })

    };

    return (

        <Dialog open={true} >

            <DialogTitle className="d-flex justify-content-center popup-icon"><FontAwesomeIcon size="lg" icon={faQuestionCircle} /></DialogTitle>
            <DialogContent className="text-center">
                <p>Soll dieser Termin wirklich gelöscht werden?</p>
            </DialogContent>
            <DialogActions className="d-flex justify-content-center">
                <Button className="btn1" onClick={deleteCurrentEvent}>Ja, löschen</Button>
                <Button className="btn-light" onClick={props.closeWindow}>Abbrechen</Button>

            <p>{errorMsg}</p>

            </DialogActions>

        </Dialog>

    );

}

export default PopUpDelete; 