//Wird benötigt, da Kalender.js ein class Component ist, aber React Hooks verwendet werden, die nur in Functional Components funktionieren

import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';



export function withRouterHOC( Child ) {
  return ( props ) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child { ...props } navigate={ navigate } location={ location } />;
  }
}