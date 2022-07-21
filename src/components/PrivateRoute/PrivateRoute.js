/*Private Route, überprüfen ob Nutzer eingeloggt ist, ansonsten sind Unterseiten nicht erreichbar*/

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, user }) => {
    let auth = useAuth();
    if (!auth.user) {
      return <Navigate to="/login" replace />
    }
    return children;
  }

export default PrivateRoute;