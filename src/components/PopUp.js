/*PopUp-Fenster: erscheint, wenn Termin bei vergangenem Datum eingetragen werden will*/

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


const PopUpWindow = (props) => {

    return (

        <Dialog open={true} >

            <DialogTitle className="d-flex justify-content-center popup-icon"><FontAwesomeIcon size="lg" icon={faTriangleExclamation} /></DialogTitle>

                <DialogContent className="text-center">
                   <p>Ausgewähltes Datum liegt <br></br>in der Vergangenheit</p>
                </DialogContent>

                <DialogActions className="d-flex justify-content-center">
                    <Button className="btn1" onClick={props.handleClosePopUp}>Ok</Button>
                </DialogActions>

        </Dialog>

    );

}

export default PopUpWindow; 