/*Logout Content, erscheint nachdem sich User erfolgreich abgemeldet hat*/

import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOut = () => {
    return (
        <div className="home">

            <div className='d-flex flex-column justify-content-center'>
                <h3>Sie haben sich erfolgreich abgemeldet!</h3>
            <Link to="/login" className='login-link'>zum Login</Link>
            </div>
        </div>
    );
}

export default LoggedOut;