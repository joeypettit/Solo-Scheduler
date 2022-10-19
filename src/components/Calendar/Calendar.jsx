import CalMonthView from "./CalMonthView/CalMonthView";
import CalNavigation from "./CalNavigation/CalNavigation";
import './Calendar.css';
import {DateTime} from 'luxon';
import {useState, useEffect} from 'react';

function Calendar(){
    const todaysDate = DateTime.now();

    console.log('in Calendar, todays date is:', todaysDate.toFormat('yyyy'));

    
    const [monthYearDisplayed, setMonthYearDisplayed] = useState(todaysDate);






    return(
        <div className="cal-holder">
            <CalNavigation />
            <CalNavigation />
            <CalMonthView todaysDate={todaysDate} monthYearDisplayed={monthYearDisplayed}/>
        </div>
    )

}

export default Calendar;