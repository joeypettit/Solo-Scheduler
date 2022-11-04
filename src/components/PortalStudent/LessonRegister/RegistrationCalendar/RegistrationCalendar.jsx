import CalMonthView from "./RegistrationMonthView/RegistrationMonthView";
import CalNavigation from '../../../CalNavigation/CalNavigation'
import {DateTime} from 'luxon';
import {useState, useEffect} from 'react';

function RegistrationCalendar(){
    const todaysDate = DateTime.now();

    // this is the date that is used as a point of reference to display calendar views
    // its default value is the current date's DateTime object.
    const [displayReferenceDate, setDisplayReferenceDate] = useState(todaysDate);

    return(
        <div className="month-holder container bg-light shadow p-4 m-1 rounded">
            <CalNavigation displayReferenceDate={displayReferenceDate} setDisplayReferenceDate={setDisplayReferenceDate}/>
            <CalMonthView todaysDate={todaysDate} displayReferenceDate={displayReferenceDate} />
        </div>
    )
}

export default RegistrationCalendar;