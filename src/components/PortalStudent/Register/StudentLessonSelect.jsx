import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';

function LessonSelect() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
        <h1>Choose your lesson</h1>
        
    </div>
  );
}

// this allows us to use <App /> in index.js
export default LessonSelect;
