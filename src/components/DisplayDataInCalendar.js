/*Component holt Documents aus der DB-Collection Termine, übergibt die Termine an den Kalender */

import React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/config';


const DisplayDataInCalendar = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();


    //Das hier iwo in useEffect reinsetzen, aber eventId ersetzen, oder nicht??
    // if(doc.data().startDate.toDate() < new Date()){
    //     await deleteDoc(doc(db, "termine", eventId));
    // }
    

    useEffect(() => {

        //Termine-Dokumente werden aus der DB geholt
        const q = query(collection(db,'termine'));
        const unsub = onSnapshot(q, (snap)=>{
            const array = snap.docs.map(doc=>{          //durch Array gehen, um Daten aus firestore zu holen
                return{
                    id: doc.id,
                    title: doc.data().titel,
                    start: doc.data().startDatum.toDate(), //Date wird in Javascript-Dateformat umgewandelt, so kennt Kalender das Datum  
                    end: doc.data().endeDatum.toDate(),
                    allDay: doc.data().allDay
                }
            });
            setData([...array]);
            console.log(array); //passt
        })
        //unmounts
        return () => {unsub()}

    },[])

    console.log("Daten für Kalendertermin aus DB: ", data); //passt
    console.log("Data Id: ", data.id)

    //über Button gelangt man auf den Kalender und die eingetragenen Termine sind sichtbar
    const AddDataToCalendar = () => {
        let path = '/kalenderansicht';
        navigate(path, { state: { data } });
    }


    return (
        <div className="home">

            <h2>Termin anlegen</h2>

            <Button className='btn1 mt-3' type='button' onClick={AddDataToCalendar}>Zur Kalenderansicht</Button>

        </div>
    );
}

export default DisplayDataInCalendar;