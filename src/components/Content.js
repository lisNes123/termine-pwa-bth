/*Definieren der Routes für alle Seiten*/

import Basisdaten from './Basisdaten';
import Termine from './Termine';
import TerminPlus from './TerminPlus';
import Calendar from './Kalender';
import Terminvorschau from './Terminvorschau';
import Terminuebersicht from './Terminuebersicht';
import Login from './Login';
import TerminDetail from './TerminDetail';
import Register from './Register';
import LoggedOut from './LoggedOut';
import DisplayDataInCalendar from './DisplayDataInCalendar';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { Route, Routes } from 'react-router-dom';
import PopUpDelete from './PopUpDelete';

//Context für Sidebar-Funktion einbinden
import { useSidebar } from '../context/SidebarContext';


const Content = () => {

    const sidebar = useSidebar()

        //Wenn Sidebar geschlossen, dann soll Content auf Seite weiter links platziert werden
        var contentClass = "";
        if (!sidebar) {
            contentClass = 'contentActive';
        }
        if (sidebar) {
            contentClass = 'content';
        }
    
    return (

        <div className={contentClass}>

            <Routes>
                {/* Routes für jede Unterseite definieren */}

                <Route exact path="/" element={<TerminPlus />} />
                <Route path="/termin/basisdaten" element={<PrivateRoute><Basisdaten /></PrivateRoute>} />
                <Route path="/termin/terminvorschau" element={<PrivateRoute><Terminvorschau /></PrivateRoute>} />
                <Route path="/termin/termine" element={<PrivateRoute><Termine /></PrivateRoute>} />
                <Route path='/terminuebersicht' element={<PrivateRoute><Terminuebersicht /></PrivateRoute>} />
                <Route path='/termindetails' element={<PrivateRoute><TerminDetail /></PrivateRoute>} />
                <Route path="/kalender" element={<PrivateRoute><DisplayDataInCalendar /></PrivateRoute>} />
                <Route path="/kalenderansicht" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                <Route path="/terminuebersicht/detailseite" element={<PrivateRoute><TerminDetail /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logoutsuccess" element={<LoggedOut />} />
                <Route path="/termin-loeschen" element={<PopUpDelete />} />

            </Routes>

        </div>
    );
}

export default Content;