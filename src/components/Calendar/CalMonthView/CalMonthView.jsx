import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';
import './CalMonthView.css';



function CalMonthView({monthYearDisplayed}){
    // holds date objects for all dates in this view
    const [displayedDates, setDisplayedDates] = useState([]);

    console.log('Test DateTime)', DateTime.now().toISODate());




    // This function creates an array of date objects for all of the days in current view
    function createDisplayedDates(){
        // get first day of the month
        const firstOfMonth = DateTime.local(monthYearDisplayed.year, monthYearDisplayed.month, 1);
        console.log('in createDisplayedDates', firstOfMonth.toISODate());
        console.log('days in this month', firstOfMonth.daysInMonth);

        // get the Monday before the first of the month (first day of this month's view)
        const firstMondayOfView = firstOfMonth.set({weekday: 1});
        console.log('firstMonday is:', firstMondayOfView.toISODate());

        // array to store all the dates in current month's calendar view
        const datesInView = []; // array to store date objects during loop
        
        // This loop builds out the month of dates
        for (let i = 0; i<(6*7); i++){
            // dateToPush is the date currently being looped over and pushed to array
            let date = firstMondayOfView.plus({days: i});
            console.log('date to map is now', date.toISODate());

            // this if statement checks to see if the final week in the loop statement starts with a day that is
            // in the current month. If it is not in the current month, break from loop. This avoids unncecessary weeks in calendar view.
            if(date.weekDay===1 
            && date.month !== firstOfMonth.month 
            && date.getTime()>displayDate.getTime()){
              break;
            }
            // push date to datesInViewArray
            datesInView.push({date, events:'none'});
            console.log('datesInView at end of loop', datesInView);
        }
        // set datesInView array to state
        setDisplayedDates(datesInView);
    }


    // function addEventToDate(){

    // }

    
    // refresh calendar on year or month viewed changes
    useEffect(()=> createDisplayedDates(),[monthYearDisplayed]);

    return (
        <div className="cal-holder">
          <div className='dayname'>Monday</div>
          <div className='dayname'>Tuesday</div>
          <div className='dayname'>Wednesday</div>
          <div className='dayname'>Thursday</div>
          <div className='dayname'>Friday</div>
          <div className='dayname'>Saturday</div>
          <div className='dayname'>Sunday</div>
          {displayedDates.map((date, index)=>{
            return(
              <div 
                key={index} 
                className={`cell-${date.date.month === monthYearDisplayed.month 
                            ?`thismonth`:`othermonth`}${
                              DateTime.now().toISODate() === date.date.toISODate() 
                              ? " currentday" : ""}`}
                >
                <div className="date">
                  {date.date.day}
                </div>
              </div>
            )
          })}
        </div>
    ) 
}
export default CalMonthView;