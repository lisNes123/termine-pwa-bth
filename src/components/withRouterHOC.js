//The library-provided HOC, withRouter, has been deprecated in React Router v6. If you need to use v6 and are using class-based React components, then you will need to write your own HOC which wraps the v6 use* hooks.
//https://stackoverflow.com/questions/62365009/how-to-get-parameter-value-from-react-router-dom-v6-in-class#:~:text=The%20library%2Dprovided%20HOC%2C%20withRouter,wraps%20the%20v6%20use*%20hooks.

//This is useful if you have a large code base that you need to move to v6, but haven't migrated all of your class-based components into functional ones.

//https://infinum.com/blog/how-to-use-react-hooks-in-class-components/

import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';



export function withRouterHOC( Child ) {
  return ( props ) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Child { ...props } navigate={ navigate } location={ location } />;
  }
}