/*Offline-Banner, der eingeblendet wird, wenn Nutzer offline*/

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const OfflineStatus = () => {
    const [isOnline, setOnlineStatus] = useState(true);

    useEffect(() => {
        const setFromEvent = function (event) {
            if (event.type === 'online') {
                setOnlineStatus(true);
            }
            else if (event.type === 'offline') {
                setOnlineStatus(false);
            }

        }

        window.addEventListener("online", setFromEvent);
        window.addEventListener("offline", setFromEvent);

        return () => {
            window.removeEventListener("online", setFromEvent);
            window.removeEventListener("offline", setFromEvent);
        }
    });

    return !isOnline ? (
        <>
            <div className="offline-bar">
                  
                       <p className='mb-0 text-center'><FontAwesomeIcon size="lg" icon={faTriangleExclamation} /> Du bist offline. Termine können derzeit nicht erstellt werden.</p>
                    
            </div>
        </>) : null;
};

export default OfflineStatus;