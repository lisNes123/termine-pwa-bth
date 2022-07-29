/*Sidebar links mit Navigationspunkten*/

import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

//Context für Sidebar-Funktion einbinden
import { useSidebar, useSidebarUpdate } from '../context/SidebarContext';
import OfflineStatus from './OfflineMsg';

const Sidebar = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const sidebar = useSidebar()
    const openSidebar = useSidebarUpdate()

    var menuIcon = null;

    //Toggle Sidebar Icon, wenn geöffnet bzw. geschlossen
    if (sidebar === false) {
        menuIcon = <FontAwesomeIcon className='sidebar-icon' icon={faBars} size="lg" onClick={openSidebar} />
    } else {
        menuIcon = <FontAwesomeIcon className='sidebar-icon' icon={faX} size="lg" onClick={openSidebar} />
    }

    return (

        <>

            <div className="headerbar d-flex flex-row">
                <div className='toggleMenu'>
                    <Button className='toggleIcon'>
                        {menuIcon}
                    </Button>
                </div>
                <div className='headertitle'>
                    <Link to="/" className="text-decoration-none"><h3>Terminverwaltung</h3></Link>
                </div>
                <div className='header-icon ms-3'>
                    <Link to="/" className="text-decoration-none"><img src='./icons/192x192.png' alt='logo' width="40em"></img></Link>
                </div>
            </div>
                         
            <div className={sidebar ? 'sidebarDiv active' : 'sidebarDiv'}>

                <ul className="sidebar nav nav-pills flex-column">

                    {/* Überprüfen, ob User eingeloggt, wenn ja dann Navigationspunkte anzeigen */}
                    {!auth.user ? (
                        <>
                            <li><NavLink to="/login" className={(navData) => (navData.isActive ? 'activeLink' : 'link')}>Login</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/" className={(navData) => (navData.isActive ? 'activeLink' : 'link')} onClick={openSidebar}><FontAwesomeIcon className='sidebar-icon me-2' icon={faCirclePlus} />Neuer Termin</NavLink></li>
                            <li><NavLink to="/kalender" className={(navData) => (navData.isActive ? 'activeLink' : 'link')} onClick={openSidebar}><FontAwesomeIcon className='sidebar-icon me-2' icon={faCalendarDays} />Kalender</NavLink></li>
                            <li><NavLink to="/terminuebersicht" className={(navData) => (navData.isActive ? 'activeLink' : 'link')} onClick={openSidebar}><FontAwesomeIcon className='sidebar-icon me-2' icon={faTableList} />Terminübersicht</NavLink></li>

                            <div className='mt-4'>
                                <div>{auth.user?.name}</div>
                                <div><p className='text-white user-name'>{auth.user?.email}</p></div>
                            </div>

                            <div className='logout d-flex mt-3'>
                                <Button onClick={() => auth.signout({ callback: () => navigate("/logoutsuccess") })} className='button-link'><FontAwesomeIcon className='sidebar-icon me-2' icon={faArrowRightFromBracket} />abmelden</Button>
                            </div>

                        </>
                    )}
                </ul>

            </div>

            <OfflineStatus />

        </>
    );
}

export default Sidebar;