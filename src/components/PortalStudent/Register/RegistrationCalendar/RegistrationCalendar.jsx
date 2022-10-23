import CalMonthView from "./RegistrationMonthView/RegistrationMonthView";
import CalNavigation from "./CalNavigation/CalNavigation";
import './RegistrationCalendar.css';
import {DateTime} from 'luxon';
import {useState, useEffect} from 'react';

function RegistrationCalendar(){
    const todaysDate = DateTime.now();

    // this is the date that is used as a point of reference to display calendar views
    // its default value is the current date's DateTime object.
    const [displayReferenceDate, setDisplayReferenceDate] = useState(todaysDate);

    return(
        <div className="cal-holder">
            <CalNavigation displayReferenceDate={displayReferenceDate} setDisplayReferenceDate={setDisplayReferenceDate}/>
            <CalMonthView todaysDate={todaysDate} displayReferenceDate={displayReferenceDate} />
        </div>
    )
}

export default RegistrationCalendar;