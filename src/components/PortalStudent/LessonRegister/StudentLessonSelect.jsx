import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import RegistrationCalendar from './RegistrationCalendar/RegistrationCalendar';


function LessonSelect() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const instructorLessons = useSelector((store)=>store.selectedInstructor);

  useEffect(()=> console.log('in LessonsSelect, selected instructor is', instructorLessons));
  

  return (
    <div className="container">
      <div className='m-3'>
        {instructorLessons.length > 0 && <h1 className='d-flex justify-content-center text-muted'>Select A Lesson Time with {instructorLessons[0].first_name}</h1>}
      </div>
        <RegistrationCalendar />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LessonSelect;
