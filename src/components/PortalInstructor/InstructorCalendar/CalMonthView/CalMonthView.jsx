import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';
// import './CalMonthView.css';
import AddEventForm from '../AddEventForm/AddEventForm';
import {useSelector, useDispatch} from 'react-redux';
import ShowLessonInfoModal from '../ShowLessonInfoModal';

function CalMonthView({displayReferenceDate}){
    const dispatch = useDispatch();

    const [displayAddForm, setDisplayAddForm] = useState(false);
    const [dateToModify, setDateToModify] = useState();

    // these are for launching the information modal for a selected lesson
    // when lessonInfoModalDisplayed is true, the modal will render with the
    // information of the lesson in thisLessonInfo
    const [thisLessonInfo, setThisLessonInfo] = useState();
    const [lessonInfoModalDisplayed, setLessonModalInfoDisplayed] = useState();

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

        // seperate dates into individual week arrays (so we can place them in bootstrap rows on render)
        let week1 =[];
        let week2 =[];
        let week3 =[];
        let week4 =[];
        let week5 =[];
        let week6 =[];

        for(let day = 0; day<datesInView.length; day++){
          if(day<7){
            week1.push(datesInView[day]);
          } else if (day<14){
            week2.push(datesInView[day]);
          } else if (day<21){
            week3.push(datesInView[day]);
          } else if (day<28){
            week4.push(datesInView[day]);
          } else if (day<35){
            week5.push(datesInView[day]);
          } else if (day<42){
            week6.push(datesInView[day]);
          }
        }

        let arrayOfWeekArrays = [week1,week2,week3,week4,week5,week6];
        console.log('The weeks of the month arrays are', arrayOfWeekArrays);
        // set datesInView array to state
        setDisplayedDates(arrayOfWeekArrays);
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

    function launchDisplayLessonInfo(thisLesson){
      setThisLessonInfo(thisLesson);
      setLessonModalInfoDisplayed(true);
    }


    // refresh calendar on year or month viewed changes
    useEffect(()=> createDisplayedDates(),[displayReferenceDate, userEvents]);
    useEffect(()=> fetchUserLessons(),[]);

    return (
        <div className="container-lg">
          <div className='row'>
            <div className='col'>Monday</div>
            <div className='col'>Tuesday</div>
            <div className='col'>Wednesday</div>
            <div className='col'>Thursday</div>
            <div className='col'>Friday</div>
            <div className='col'>Saturday</div>
            <div className='col'>Sunday</div>
          </div>

          {/* Week 1 */}
          <div className='row'>
          {displayedDates[0] && displayedDates[0].map((date, index)=>{
            return(
              <div 
                key={index} 
                className={`col ${date.date.month === displayReferenceDate.month 
                            ?`bg-white m-1 px-0 py-1 shadow border`:`bg-gray-900 m-1 px-0 py-1 shadow border`}${
                              DateTime.now().toISODate() === date.date.toISODate() 
                              ? "bg-primary m-1 px-0 py-1 shadow border" : ""}`}
                >
                <div className="d-flex justify-content-between">
                  <span className="px-1 mx-1 border border-dark shadow-sm bg-light">{date.date.day}</span>
                  <span>
                    <button className="btn btn-sm btn-primary mx-1" onClick={()=> {setDisplayAddForm(true), setDateToModify(date.date.toISODate())}}>+</button>
                  </span>
                </div>
                <div className="">
                    {date.events.length > 0 
                        ? date.events.map((thisEvent, index)=>{
                            let eventText = `${DateTime.fromISO(thisEvent.start_time).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(thisEvent.end_time).toLocaleString(DateTime.TIME_SIMPLE)}`
                            
                            // if the class is before current date, it wont appear at all
                            // if a student is registerd for a class it will appear different color and with cancel button,
                     
                            if (DateTime.fromISO(thisEvent.start_time) < DateTime.now()){
                              return <div key={index} className='alert alert-secondary p-1 m-1'>{eventText}<button className="btn" onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='alert alert-success p-1 m-1'>{eventText}<button className="btn" onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button className="btn" onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='alert alert-primary p-1 m-1'>{eventText}<button className="btn" onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}

          {/* Week 2 */}
          <div className='row'>
          {displayedDates[1] && displayedDates[1].map((date, index)=>{
            return(
    
              <div 
                key={index} 
                className={`col cell-${date.date.month === displayReferenceDate.month 
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
                              return <div key={index} className='event-holder past'>{eventText}<button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}

          {/* Week 3 */}
          <div className='row'>
          {displayedDates[2] && displayedDates[2].map((date, index)=>{
            return(
    
              <div 
                key={index} 
                className={`col cell-${date.date.month === displayReferenceDate.month 
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
                              return <div key={index} className='event-holder past'>{eventText}<button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}

          {/* Week 4 */}
          <div className='row'>
          {displayedDates[3] && displayedDates[3].map((date, index)=>{
            return(
    
              <div 
                key={index} 
                className={`col cell-${date.date.month === displayReferenceDate.month 
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
                              return <div key={index} className='event-holder past'>{eventText}<button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}

          {/* Week 5 */}
          <div className='row'>
          {displayedDates[4] && displayedDates[4].map((date, index)=>{
            return(
    
              <div 
                key={index} 
                className={`col cell-${date.date.month === displayReferenceDate.month 
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
                              return <div key={index} className='event-holder past'>{eventText}<button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}

          {/* Week 6 */}
          <div className='row'>
          {displayedDates[5] && displayedDates[5].map((date, index)=>{
            return(
    
              <div 
                key={index} 
                className={`cell col my-1 ${date.date.month === displayReferenceDate.month 
                            ?`bg-white`:`bg-secondary`}${
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
                              return <div key={index} className='event-holder past'>{eventText}<button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else if(!thisEvent.students_enrolled_ids.includes(null)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button><button onClick={()=>launchDisplayLessonInfo(thisEvent)}>Info</button></div>
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='delete-event' onClick={()=>deleteEvent(thisEvent.lesson_id)}>X</button></div>
                            }})
                        : null }
                </div>
              </div>
            )
          })}
          </div>
          {/* --------------------------------------------------- */}




          {displayAddForm ? <AddEventForm setDisplayAddForm={setDisplayAddForm} dateToModify={dateToModify}/> : null}
          {lessonInfoModalDisplayed ? <ShowLessonInfoModal thisLessonInfo={thisLessonInfo} setLessonModalInfoDisplayed={setLessonModalInfoDisplayed}/> : null}

        </div>
    ) 
}
export default CalMonthView;