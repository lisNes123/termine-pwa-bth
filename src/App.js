import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './components/Content';
import { SidebarProvider } from './context/SidebarContext';


function App() {

  return (
    <>

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

