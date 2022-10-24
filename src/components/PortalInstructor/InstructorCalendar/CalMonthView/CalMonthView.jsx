import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';
import './CalMonthView.css';
import AddEventForm from '../AddEventForm/AddEventForm';
import {useSelector, useDispatch} from 'react-redux';

function CalMonthView({displayReferenceDate}){
    const dispatch = useDispatch();

    const [displayAddForm, setDisplayAddForm] = useState(false);
    const [dateToModify, setDateToModify] = useState();

    // holds date objects for all dates in this view
    const [displayedDates, setDisplayedDates] = useState([]);
    console.log('displayedDates is', displayedDates);
    // date objects ==>      {
                            // instructor_id: 
                            // start_time: 
                            // end_time: 
                            // is_open: 
                            // is_complete: 
                    //       }    

    console.log('Test DateTime)', DateTime.now().toISODate());

    const userEvents = useSelector(store => store.lessons);
    console.log('userEvents is', userEvents);

    function fetchUserLessons(){
        dispatch({
            type: 'FETCH_LESSONS'
        })
    }

    // This function creates an array of date objects for all of the days in current view
    function createDisplayedDates(){
        // get first day of the month
        const firstOfMonth = DateTime.local(displayReferenceDate.year, displayReferenceDate.month, 1);
        // console.log('in createDisplayedDates', firstOfMonth.toISODate());
        // console.log('days in this month', firstOfMonth.daysInMonth);

        // get the Monday before the first of the month (first day of this month's view)
        const firstMondayOfView = firstOfMonth.set({weekday: 1});
        // console.log('firstMonday is:', firstMondayOfView.toISODate());

        // array to store all the dates in current month's calendar view
        const datesInView = []; // array to store date objects during loop
        
        // This loop builds out the month of dates
        for (let i = 0; i<(6*7); i++){
            // dateToPush is the date currently being looped over and pushed to array
            let date = firstMondayOfView.plus({days: i});
            // console.log('date to map is now', date.toISODate());

            // this if statement checks to see if the final week in the loop statement starts with a day that is
            // in the current month. If it is not in the current month, break from loop. This avoids unncecessary weeks in calendar view.
            if(date.weekday===1 
            && date.month !== firstOfMonth.month 
            && date > firstOfMonth){
              break;
            }
            // push date to datesInViewArray
            datesInView.push({date, events: findEventsForDate(userEvents, date)});
            // console.log('datesInView at end of loop', datesInView);
        }
        // set datesInView array to state
        setDisplayedDates(datesInView);
    }


    // this function filters through person's events (array of event objects) and attaches those 
    // that have a start time on the inputted date (date arguement is a Luxon DateTime object);
    function findEventsForDate(events, date){
        console.log('in findEventsForDate, event is:', events);
        // filter persons events array and match those with start time on this date.
        let todaysEventArr = events.filter((thisEvent)=>{
            // console.log('in findEventsForDate filter', date.toISODate());
            if(DateTime.fromISO(thisEvent.start_time).toISODate()===date.toISODate()){
                return true;
            }
            });
            console.log('in findEventsForDate, array is:', todaysEventArr);
        // return array of objects with all events associated with inputed date.
        return todaysEventArr;
    }

    function deleteEvent(eventId){
        console.log('in delete event', eventId);

        //~~~ dispatch event id to lessons saga
        dispatch({
            type: 'DELETE_LESSON',
            payload: eventId
        });

    }


    // refresh calendar on year or month viewed changes
    useEffect(()=> createDisplayedDates(),[displayReferenceDate, userEvents]);
    useEffect(()=> fetchUserLessons(),[]);

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
                className={`cell-${date.date.month === displayReferenceDate.month 
                            ?`thismonth`:`othermonth`}${
                              DateTime.now().toISODate() === date.date.toISODate() 
                              ? " currentday" : ""}`}
                >
                <div className="cal-date">
                  {date.date.day}
                  <button className="add-event" onClick={()=> {setDisplayAddForm(true), setDateToModify(date.date.toISODate())}}>+</button>
                </div>
                <div className="cal-event-holder">
                    {date.events.length > 0 
                        ? date.events.map((thisEvent, index)=>{
                            let eventText = `${DateTime.fromISO(thisEvent.start_time).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(thisEvent.end_time).toLocaleString(DateTime.TIME_SIMPLE)}`
                            
                            // if the class is before current date, it wont appear at all
                            // if a student is registerd for a class it will appear different color and with cancel button,
                     
                            if (DateTime.fromISO(thisEvent.start_time) < DateTime.now()){
                              return <div key={index} className='event-holder past'>{eventText}<button>Info</button></div>
                            } else if(thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          {displayAddForm ? <AddEventForm setDisplayAddForm={setDisplayAddForm} dateToModify={dateToModify}/> : null}
        </div>
    ) 
}
export default CalMonthView;