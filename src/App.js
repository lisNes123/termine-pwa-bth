import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';


import Content from './components/Content';



import { SidebarProvider } from './context/SidebarContext';


// import Fader from 'react-fader'



function App() {

  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: "", body: "" });

  // console.log(show, notification);

  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));


  
  // useEffect(()=>{
  //   const msg = getMessaging(firebaseApp);
  //   msg.requestPermission().then(()=>{
  //     return getToken(msg);

  //   }).then((data)=>{
  //     console.warn("token", data)
  //   })
  // })


  return (
    <>

      {/* {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <Fader text="Hello React"></Fader> */}


      <SidebarProvider>

        <Router>
          <div className="App d-flex flex-column">
            <Sidebar />
            <div className='d-flex flex-row'>
              <Content />
            </div>

          </div>
        </Router>

      </SidebarProvider>

    </>
  );
}

export default App;

