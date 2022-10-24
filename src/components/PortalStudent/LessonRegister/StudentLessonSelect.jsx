import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';
import {useEffect} from 'react';
import RegistrationCalendar from './RegistrationCalendar/RegistrationCalendar';


function LessonSelect() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const instructorLessons = useSelector((store)=>store.selectedInstructor);

  useEffect(()=> console.log('in LessonsSelect, selected instructor is', instructorLessons));
  

  return (
    <div className="container">
        <h1>Choose your lesson</h1>
        <RegistrationCalendar />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LessonSelect;
