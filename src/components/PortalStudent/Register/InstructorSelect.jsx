import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';

function InstructorSelect() {
  const dispatch = useDispatch();
  const instructors = useSelector(store => store.instructors)
  console.log('In Instructor Select, instructors are', instructors);

  function handleSelection(instructorId){
    dispatch({
      type: 'SET_SELECTED_INSTRUCTOR',
      payload: instructorId
    })
    history.push('/student-lesson-select')
  }

  // GET list of instructors (set to instructors ^^^)
  function fetchInstructors(){
    dispatch({
      type: 'FETCH_INSTRUCTORS'
    })
  }

  useEffect(()=>fetchInstructors(), []);
  useEffect(()=>console.log('In Instructor Select, instructors are', instructors))

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
        <h1>Choose Your Instructor</h1>
        {instructors !==[] ? instructors.map((instructor, index)=>{
          return <div key={index}>{instructor.first_name} {instructor.last_name}</div>
        }) : null}
        <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorSelect;
