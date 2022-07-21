import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import deLocale from '@fullcalendar/core/locales/de';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import AddEvent from './addEvent';
import PopUpWindow from './PopUp';
import { withRouterHOC } from './withRouterHOC';
import { Container, Row, Col, Form } from "react-bootstrap";



class CalendarTest extends React.Component {

    state = {

        weekendsVisible: true,

        currentEvents: [],

        show: false,

        dateClicked: null,

        popUp: false

    }

    updateState = () => this.setState({ show: true });

    updateStatePopUp = () => this.setState({ popUp: true });

    render() {
        
        const {location} = this.props;
        console.log(location);
        console.log("Data mit state: ", location.state.data); //passt

        return (

            <div className='calendar'>

            <Container>
            <Row>

                <Col sm={12} md={12} lg={9} xl={9}  className='calendar-main ps-1 ps-sm-3 ps-md-3 ps-lg-4 pe-1 pe-sm-3 pe-md-3 pe-lg-4 mb-4'>
                
                {/* Add Event Box*/}
                {this.state.show && <AddEvent handleClose={()=>this.setState({show: false})} clickedDate = {this.state.dateClicked} /*showForm={() => history.push('/termin/basisdaten', { from: "CalendarTest" })}*//>}

                {/* POP-UP */}
                {this.state.popUp && <PopUpWindow handleClosePopUp={()=>this.setState({popUp: false})} clickedDate = {this.state.dateClicked} /*showForm={() => history.push('/termin/basisdaten', { from: "CalendarTest" })}*//>}

                    <FullCalendar

                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}

                        themeSystem='bootstrap5'

                        headerToolbar={{

                            left: 'prev,next',

                            right: 'title',

                        }}

                        footerToolbar={{

                            center: 'dayGridMonth,timeGridWeek,timeGridDay'

                        }}

                       

                        buttonText={{

                            today: 'heutiges Datum',
                            prev: <FontAwesomeIcon className='sidebar-icon' icon={faChevronLeft} />,
                            next: <FontAwesomeIcon className='sidebar-icon' icon={faChevronRight} />

                        }}

                       

                        eventBackgroundColor='#218199'

                        eventBorderColor='#218199'

                        locale={deLocale}

                        // aspectRatio={2}

                        height={600}

                        initialView='dayGridMonth'

                        editable={true}

                        selectable={true}

                        selectMirror={true}

                        dayMaxEvents={true}

                        weekends={this.state.weekendsVisible}

                        dateClick={this.handleDateClick}

                        eventClick={this.handleEventClick}


                        events={location.state.data}

                    />
                </Col>

                <Col sm={12} md={12} lg={3} xl={3} className='sidebar-cal d-flex flex-wrap'>
                  {this.renderSidebar()} 
                  {this.state.popUp}
                </Col>

            </Row>
            </Container>

            </div>

        )

    }


    renderSidebar() {

        return (

            <div className='calendar-sidebar'>

                    <p><FontAwesomeIcon className='sidebar-icon me-2' icon={faChevronRight} />Klicke auf ein Datum im Kalender und erstelle einen neuen Termin</p>
                    <p><FontAwesomeIcon className='sidebar-icon me-2' icon={faChevronRight} />Klicke auf einen Termin um Details zu sehen</p>

                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Wochenende anzeigen"
                        checked={this.state.weekendsVisible}
                        onChange={this.handleWeekendsToggle}
                    />

            </div>

        )

    }


    handleWeekendsToggle = () => {

        this.setState({

            weekendsVisible: !this.state.weekendsVisible

        })

    }

    handleEventClick = (clickInfo) => {

        const {navigate} = this.props;

        const docId = clickInfo.event.id;
        console.log(docId);
        
        navigate("/termindetails", {state: {docId}});

    }



    handleDateClick = (selectInfo) => {

    const selectedDay = selectInfo.dateStr;
    console.log("Selected day: ", selectedDay);

    const formatYmd = date => date.toISOString().slice(0, 10);
    const today = formatYmd(new Date());  
    console.log("Today's date: ", today)


    if (selectedDay < today){

        this.updateStatePopUp()
            
       }else{

            this.updateState()

            console.log(this.state.show)

            let date = selectInfo.dateStr;
        
            this.setState({ dateClicked: date });
       }
            
    }

}

export default withRouterHOC(CalendarTest);
