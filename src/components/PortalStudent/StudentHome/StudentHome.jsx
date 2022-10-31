import LogOutButton from '../../LogOutButton/LogOutButton';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {DateTime} from 'luxon';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

function StudentHome() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const allLessons = useSelector(store => store.studentLessons); // all lessons this student has scheduled (with all instructors)
  const [lessonsToDisplay, setLessonsToDisplay] = useState([null]);
  const instructorList = useSelector(store=>store.instructors);

  console.log('in student home', instructorList);


  // this function sorts through all instructor lessons and
  // sets lessonsToDisplay to an array of the next 5 upcoming lessons that have students enrolled for.
  function sortLessons(){
    let nextFiveLessons = [];

    // This loop checks that the lesson is after current time then
    // it will push the first five of these lessons after current time to the nextFiveLessons array
    for(let lesson of allLessons){
      if(DateTime.fromISO(lesson.start_time)>DateTime.now()
          && nextFiveLessons.length <= 5){
    
          for(let instructor of instructorList){
            if(lesson.instructor_id === instructor.id){
              lesson.instructorName=[];
              lesson.instructorName.push(`${instructor.first_name} ${instructor.last_name}`);
            }
          }
        nextFiveLessons.push(lesson);
        console.log('in sort lessons,', lesson);
      }
    }
    setLessonsToDisplay(nextFiveLessons);
  }


  useEffect(()=>dispatch({type: 'FETCH_STUDENT_LESSONS'}), []);
  useEffect(()=>dispatch({type: 'FETCH_INSTRUCTORS'}), []);
  useEffect(()=>sortLessons(), [allLessons, instructorList]);

  return (

    <div className="container column">
      <h1 className="text-center text-muted m-3">Student Home</h1>

      <div className='container col-6 d-flex flex-column align-items-center'>
        <h2>Welcome, {user.first_name}!</h2>
        <div className='container d-flex flex-row justify-content-around my-3'>
          <Button variant="outline-primary" onClick={()=> history.push("/student-instructor-select")}>Schedule a Lesson</Button>
          <LogOutButton className="btn-lg" />
        </div>
      </div>

      <div className='container p-2 bg-light shadow col-8 rounded my-4'>
        <div>
          <h1 className='text-muted text-center my-3'>Upcoming Scheduled Lessons:</h1>
        </div>
          {!lessonsToDisplay.includes(null) ? lessonsToDisplay.map((lesson, index)=>{
            const startTime = DateTime.fromISO((lesson.start_time));
            const endTime = DateTime.fromISO((lesson.end_time));

            return <Alert key={index} variant="success" className='d-flex justify-content-between align-items-center'>
                      <div className='col-5 bg-light p-2 rounded text-muted shadow-sm text-center'>
                        <h4>{startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h4>
                        <h4>{startTime.toLocaleString(DateTime.TIME_SIMPLE)} - {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h4>
                      </div>
                      <div className='col-2 text-center'><h4>With</h4></div>
                      <div className='col-4'>
                        <Badge bg="primary" className='my-1 shadow'><h5>{lesson.instructorName}</h5></Badge>
                      </div>   
                    </Alert>
          }): null }
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default StudentHome;
