import { TextField } from "@mui/material";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useState } from "react";



const AddEvent = (props) => {

    const navigate = useNavigate();

    
    //eingegebener Termintitel an Formular "Basisdaten" übergeben
    const routeToForm = () => {
        let path = '/termin/basisdaten';
        navigate(path, {state:{title, selectedDate}});
    }

    const [title, setTitle] = useState('Neuer Termin');

    console.log("Date in AddEvent: ", props.clickedDate) //funktioniert 

    const selectedDate = props.clickedDate;

    return (

        <Dialog open={true} >

            <DialogTitle>Termin erstellen</DialogTitle>

            <Form>

                <DialogContent>

                    <TextField className="formfield"
                        variant="standard"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>
                    </TextField>

                </DialogContent>

                <DialogActions className="d-flex justify-content-center">

                    <Button className="btn1" onClick={routeToForm}>Anlegen</Button>

                    <Button className="btn-light" onClick={props.handleClose}>Abbrechen</Button>

                </DialogActions>

            </Form>

        </Dialog>

    );

}

export default AddEvent; 