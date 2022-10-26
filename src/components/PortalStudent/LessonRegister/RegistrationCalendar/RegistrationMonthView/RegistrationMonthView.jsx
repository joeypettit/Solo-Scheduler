import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ConfirmLessonTime from '../RegistrationModals/ConfirmLessonTime';
import RegistrationSuccessful from '../RegistrationModals/RegistrationSuccessful';
import ConfirmCancellation from '../RegistrationModals/ConfirmCancellation';

function RegistrationMonthView({displayReferenceDate}){
    // assign dispatch
    const dispatch = useDispatch();

    //~~~ Current user
    const user = useSelector(store=>store.user);

    //~~~ instructorLessons contains an object of lessons from selected instructor
    const instructorLessons = useSelector(store => store.selectedInstructor);

    //~~~ Lessons to edit
    const [lessonToSchedule, setLessonToSchedule] = useState();
    const [lessonToCancel, setLessonToCancel] = useState();

    //~~~ Modal Displays
    const [confirmModalDisplayed, setConfirmModalDisplayed] = useState(false);
    const [successModalDisplayed, setSuccessModalDisplayed] = useState(false);
    const [cancelModalDisplayed, setCancelModalDisplayed] = useState(false);

    
    // holds date objects for all dates in this view
    const [displayedDates, setDisplayedDates] = useState([]);
    // date objects ==>      {
                            // instructor_id: 
                            // start_time: 
                            // end_time: 
                            // is_open: 
                            // is_complete: 
                    //       }    

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
            datesInView.push({date, events: findEventsForDate(instructorLessons, date)});
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

        // set all week arrays to state in an array
        let arrayOfWeekArrays = [week1,week2,week3,week4,week5,week6];
        console.log('The weeks of the month arrays are', arrayOfWeekArrays);
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
        console.log(todaysEventArr);
        return todaysEventArr;
    }

    function launchConfirmLessonTimeModal(selectedLesson){
      console.log('in launchConfirmLessonTimeModal', selectedLesson);
      setLessonToSchedule(selectedLesson);
      setConfirmModalDisplayed(true);
    }

    function launchCancellationModal(selectedLesson){
      setLessonToCancel(selectedLesson);
      setCancelModalDisplayed(true);
    }
    

    // refresh calendar on year or month viewed changes
    useEffect(()=> createDisplayedDates(),[displayReferenceDate, instructorLessons]);

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
                </div>
                <div className="cal-event-holder">
                    {date.events.length > 0 
                        ? date.events.map((thisEvent, index)=>{
                            let eventText = `${DateTime.fromISO(thisEvent.start_time).toLocaleString(DateTime.TIME_SIMPLE)} to ${DateTime.fromISO(thisEvent.end_time).toLocaleString(DateTime.TIME_SIMPLE)}`
                            
                            // if a student is registerd for a class it will appear different color and with cancel button, 
                            // if the class is taken by someone else, it won't appear at all.
                            // if the class is before current date, it wont appear at all
                     
                            if (DateTime.fromISO(thisEvent.start_time) < DateTime.now()){
                              return null;
                            } else if(thisEvent.registered_students_ids.includes(user.id)){
                              return <div key={index} className='event-holder registered'>{eventText}<button className='cancel-event' onClick={()=>launchCancellationModal(thisEvent)}>Cancel</button></div>
                            } else if (!thisEvent.registered_students_ids.includes(null) && !thisEvent.registered_students_ids.includes(user.id)){
                              return null;
                            } else{
                              return <div key={index} className='event-holder'>{eventText}<button className='select-event' onClick={()=>launchConfirmLessonTimeModal(thisEvent)}>Select</button></div>
                            }
                        }) : ''}
                </div>
              </div>
            )
          })}
          {confirmModalDisplayed ? <ConfirmLessonTime lessonToSchedule={lessonToSchedule} 
                                    setConfirmModalDisplayed={setConfirmModalDisplayed}  
                                    setSuccessModalDisplayed={setSuccessModalDisplayed}/> 
                                  : null}
          {successModalDisplayed ? <RegistrationSuccessful setSuccessModalDisplayed={setSuccessModalDisplayed}/> 
                                  : null}
          {cancelModalDisplayed ? <ConfirmCancellation setCancelModalDisplayed={setCancelModalDisplayed} lessonToCancel={lessonToCancel}/> 
                                  : null}
        </div>
    ) 
}
export default RegistrationMonthView;