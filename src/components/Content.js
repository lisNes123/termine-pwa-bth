/*Definieren der Routes für alle Seiten*/

import Basisdaten from './Basisdaten';
import Termine from './Termine';
import TerminPlus from './TerminPlus';
import CalendarTest from './Kalender';
import Terminvorschau from './Terminvorschau';
import Terminuebersicht from './Terminuebersicht';
import Login from './Login';
import TerminDetail from './TerminDetail';
import Register from './Register';
import LoggedOut from './LoggedOut';
import DisplayDataInCalendar from './DisplayDataInCalendar';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { Route, Routes } from 'react-router-dom'; //ohne Router funktioniert es nicht

//Context für Sidebar-Funktion einbinden
import { useSidebar } from '../context/SidebarContext';
import PopUpDelete from './PopUpDelete';



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
        console.log(contentClass);


    console.log("Sidebar App: ", sidebar);
    

    return (

        <div className={contentClass}>

            <Routes>
                {/* Routes für jede Unterseite definieren */}

                <Route exact path="/" element={<PrivateRoute><TerminPlus /></PrivateRoute>} />
                <Route exact path="/" element={<TerminPlus />} />
                <Route path="/termin/basisdaten" element={<Basisdaten />} />
                <Route path="/termin/terminvorschau" element={<Terminvorschau />} />
                <Route path="/termin/termine" element={<Termine />} />
                <Route path='/terminuebersicht' element={<Terminuebersicht />} />
                <Route path='/termindetails' element={<TerminDetail />} />
                <Route path="/kalender" element={<DisplayDataInCalendar />} />
                <Route path="/kalenderansicht" element={<CalendarTest />} />
                <Route path="/terminuebersicht/detailseite" element={<TerminDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logoutsuccess" element={<LoggedOut />} />
                <Route path="/termin-loeschen" element={<PopUpDelete />} />

                {/* Add Route Router last -> https://www.google.com/search?q=react+pwa+routing&oq=react+pwa+routes&aqs=chrome.1.69i57j0i22i30j0i390l4.5936j0j7&sourceid=chrome&ie=UTF-8#kpvalbx=_PRtqYvexJqr-7_UPmP6juAQ14 */}
            </Routes>

        </div>
    );
}

export default Content;