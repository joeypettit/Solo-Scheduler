import CalMonthView from "./CalMonthView/CalMonthView";
import CalNavigation from "./CalNavigation/CalNavigation";
import './Calendar.css';
import {DateTime} from 'luxon';
import {useState, useEffect} from 'react';

function Calendar(){
    const todaysDate = DateTime.now();

    console.log('in Calendar, todays date is:', todaysDate.toFormat('yyyy'));

    // These pieces of state track which month and year we are currently viewing
    // default states are set to the month/year of today's date (local time);
    const [monthViewed, setMonthViewed] = useState(Number(todaysDate.toFormat('L')));
    const [yearViewed, setYearViewed] = useState(Number(todaysDate.toFormat('yyyy')));






    return(
        <div className="cal-holder">
            <CalNavigation monthViewed={monthViewed} yearViewed={yearViewed} setMonthViewed={setMonthViewed} setYearViewed={setYearViewed}/>
            <CalNavigation />
            <CalMonthView todaysDate={todaysDate} monthViewed={monthViewed} yearViewed={yearViewed}/>
        </div>
    )

}

export default Calendar;