import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from "react-bootstrap";


const OfflineStatus = () => {
    const [isOnline, setOnlineStatus] = useState(true);

    // https://stackoverflow.com/questions/44756154/progressive-web-app-how-to-detect-and-handle-when-connection-is-up-again
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
                
                    
                       <p className='mb-0 text-center'><FontAwesomeIcon size="lg" icon={faTriangleExclamation} /> Sie sind offline. Termine können derzeit nicht erstellt oder angezeigt werden.</p>
                    
                
            </div>
        </>) : null;
};

export default OfflineStatus;