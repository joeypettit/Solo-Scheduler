import {DateTime} from 'luxon';
import {useEffect, useState} from 'react';
import './CalMonthView.css';
import AddEventForm from '../AddEventForm/AddEventForm';
import {useSelector, useDispatch} from 'react-redux';
import ShowLessonInfoModal from '../../InstructorModals/ShowLessonInfoModal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmModal from '../../InstructorModals/DeleteConfirmModal';

function CalMonthView({displayReferenceDate}){
    //~~~ Assign dispatch
    const dispatch = useDispatch();

    //~~~ All events of current user
    const userEvents = useSelector(store => store.lessons);

    //~~~ Lesson to be modified
    const [thisLessonInfo, setThisLessonInfo] = useState();

    //~~~ display bootstrap modals
    const [displayLessonInfoModal, setDisplayLessonInfoModal] = useState(false);
    const [displayDeleteConfirmModal, setDisplayDeleteConfirmModal] = useState(false);

    const [displayAddForm, setDisplayAddForm] = useState(false);
    const [dateToModify, setDateToModify] = useState();



    //~~~ holds date objects for all dates in this view
    const [displayedDates, setDisplayedDates] = useState([]);
    // date objects ==>      {
                            // instructor_id: 
                            // start_time: 
                            // end_time: 
                            // is_open: 
                            // is_complete: 
                    //       }    



    //~~~ These functions launch bootstrap modals with correct info
    function launchDeleteConfirmationModal(thisLesson){
      setThisLessonInfo(thisLesson);
      setDisplayDeleteConfirmModal(true);
    }

    function launchDisplayLessonInfo(thisLesson){
      setThisLessonInfo(thisLesson);
      // setLessonModalInfoDisplayed(true);
      setDisplayLessonInfoModal(true);
    }

    //~~~~~~~~~~~~

    //~~~ This function creates an array of date objects for all of the days in current view
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

        //~~~ seperate dates into individual week arrays (so we can place them in bootstrap rows on render)
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
      return todaysEventArr;
    }


    // this function will create the jsx for each row of the calendar and wrap each one in a 
    // div with a bootstrap row class. It will then export all of jsx to build out the entire monthly calendar
    function createWeekRows(thisWeeksDates){
      return (
        <div className='row mx-0'>
        {thisWeeksDates && thisWeeksDates.map((date, index)=>{
          return(
            <div 
              key={index} 
              className={`col cell rounded ${date.date.month === displayReferenceDate.month ? (DateTime.now().toISODate() === date.date.toISODate() ? `bg-primary m-1 px-0 py-1 shadow-sm border bg-opacity-50` : `bg-white m-1 px-0 py-1 shadow-sm border`): `bg-secondary m-1 px-0 py-1 shadow-sm border bg-opacity-10`}`}
              >
              <div className="d-flex justify-content-between">
                <span className="date-holder px-1 mx-1 border border-dark rounded shadow-sm bg-light d-flex align-items-center justify-content-center">{date.date.day}</span>
                <span>
                  <button className="btn btn-sm btn-primary mx-1" onClick={()=> {setDisplayAddForm(true), setDateToModify(date.date.toISODate())}}>+</button>
                </span>
              </div>
              <div className="">
                  {date.events.length > 0 
                      ? date.events.map((thisEvent, index)=>{
                          let eventText = `${DateTime.fromISO(thisEvent.start_time).toLocaleString(DateTime.TIME_SIMPLE)}-${DateTime.fromISO(thisEvent.end_time).toLocaleString(DateTime.TIME_SIMPLE)}`
                          
                          // if class is in the past, and has no students, display as grey and no info button
                          // else if class is in the past, but contained students, display as grey with info button
                          // else if a student is registered for a class it will appear different color and with cancel button,
                   
                          if (DateTime.fromISO(thisEvent.start_time) < DateTime.now() && !thisEvent.students_enrolled_ids.includes(null)){
                            return <div key={index} className='alert alert-warning p-1 m-1'><span className=''><p className='event-text'>{eventText}</p></span><hr/>
                                      <div className='d-flex justify-content-around'>
                                        <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDisplayLessonInfo(thisEvent)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-square-fill" viewBox="0 0 16 16">
                                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                          </button>
                                          <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDeleteConfirmationModal(thisEvent)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                          </svg>
                                        </button>
                                        </div>
                                    </div>
                                    
                          } else if(DateTime.fromISO(thisEvent.start_time) < DateTime.now() && thisEvent.students_enrolled_ids.includes(null)){
                            return <div key={index} className='alert alert-warning p-1 m-1'><p className='event-text'>{eventText}</p><hr/>
                                    <div className='d-flex justify-content-around'>
                                    <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDisplayLessonInfo(thisEvent)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-square-fill" viewBox="0 0 16 16">
                                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                      </button>
                                      <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDeleteConfirmationModal(thisEvent)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                          } else if(!thisEvent.students_enrolled_ids.includes(null)){
                            return <div key={index} className='alert alert-success p-1 m-1 '><p className='event-text'>{eventText}</p><hr/>
                                    <div className='d-flex justify-content-around'>
                                      <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDisplayLessonInfo(thisEvent)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-square-fill" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                          </svg>
                                        </button>
                                        <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDeleteConfirmationModal(thisEvent)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                          } else{
                            return <div key={index} className='alert alert-primary p-1 m-1'><p className='event-text'>{eventText}</p><hr/>
                                    <div className='d-flex justify-content-around'>
                                        <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDisplayLessonInfo(thisEvent)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-square-fill" viewBox="0 0 16 16">
                                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                            </svg>
                                          </button>
                                          <button className="btn btn-sm opacity-75 btn-light border shadow-sm" onClick={()=>launchDeleteConfirmationModal(thisEvent)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                          </button>
                                        </div>                           
                                   </div>
                              }
                          })
                    : null }
              </div>
            </div>
          )
        })}
        </div>
      )
    }



    //~~~ FETCH ALL LESSONS OF LOGGED IN INSTRUCTOR (used in useEffect)
    function fetchUserLessons(){
      dispatch({
          type: 'FETCH_LESSONS'
      })
    }

    //~~~ refresh calendar on year or month viewed changes
    useEffect(()=> createDisplayedDates(),[displayReferenceDate, userEvents]);

    //~~~ fetch user lessons on page load
    useEffect(()=> fetchUserLessons(),[]);

    return (
        <div className="container-lg m-1">
          <div className='row mx-0'>
            <div className='weekday col d-flex justify-content-center'>Monday</div>
            <div className='weekday col d-flex justify-content-center'>Tuesday</div>
            <div className='weekday col d-flex justify-content-center'>Wednesday</div>
            <div className='weekday col d-flex justify-content-center'>Thursday</div>
            <div className='weekday col d-flex justify-content-center'>Friday</div>
            <div className='weekday col d-flex justify-content-center'>Saturday</div>
            <div className='weekday col d-flex justify-content-center'>Sunday</div>
          </div>

          {createWeekRows(displayedDates[0])}
          {createWeekRows(displayedDates[1])}
          {createWeekRows(displayedDates[2])}
          {createWeekRows(displayedDates[3])}
          {createWeekRows(displayedDates[4])}
          {createWeekRows(displayedDates[5])}

          {/* conditional render of modals (if this lessonInfo) */}
          {thisLessonInfo && <ShowLessonInfoModal displayLessonInfoModal={displayLessonInfoModal} onHide={()=> setDisplayLessonInfoModal(true)} setDisplayLessonInfoModal={setDisplayLessonInfoModal} thisLessonInfo={thisLessonInfo}/>}
          {thisLessonInfo && <DeleteConfirmModal displayDeleteConfirmModal={displayDeleteConfirmModal} onHide={()=> setDisplayDeleteConfirmModal(true)} setDisplayDeleteConfirmModal={setDisplayDeleteConfirmModal} thisLessonInfo={thisLessonInfo}/>}


    

        </div>
    ) 
}
export default CalMonthView;