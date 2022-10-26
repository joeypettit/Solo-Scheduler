import CalMonthView from "./CalMonthView/CalMonthView";
import CalNavigation from "./CalNavigation/CalNavigation";
import './InstructorCalendar.css';
import {DateTime} from 'luxon';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Calendar(){
    const todaysDate = DateTime.now();

    console.log('in Calendar, todays date is:', todaysDate.toFormat('yyyy'));

    // this is the date that is used as a point of reference to display calendar views
    // its default value is the current date's DateTime object.
    const [displayReferenceDate, setDisplayReferenceDate] = useState(todaysDate);


    return(
        <div className="month-holder container bg-light shadow p-4 m-1" >
            <CalNavigation displayReferenceDate={displayReferenceDate} setDisplayReferenceDate={setDisplayReferenceDate}/>
            <CalMonthView todaysDate={todaysDate} displayReferenceDate={displayReferenceDate}/>
        
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
          
                <Modal.Body>
                  <p>Modal body text goes here.</p>
                </Modal.Body>
          
                <Modal.Footer>
                  <Button variant="secondary">Close</Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal.Dialog>
        </div>
            
          
         
    )

}

export default Calendar;