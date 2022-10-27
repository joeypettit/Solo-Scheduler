import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';
import {useHistory} from 'react-router-dom';
import {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import './StudentInstructorSelect.css';

function InstructorSelect() {
  const history = useHistory();
  const dispatch = useDispatch();
  const instructors = useSelector(store => store.instructors)
  console.log('In Instructor Select, instructors are', instructors);

  function handleSelection(instructorId){
    console.log('in handleSelection', instructorId);
    dispatch({
      type: 'FETCH_SELECTED_INSTRUCTOR_LESSONS',
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
    <div className='container text-center'> 
        <h1 className='display-4 text-muted my-3'>Choose Your Instructor</h1>
        {instructors !==[] ? instructors.map((instructor, index)=>{
          return (<Card key={index} className='inst-card bg-light shadow-sm my-2' onClick={()=>handleSelection(instructor.id)}>
                    <Card.Body className='d-flex flex-row'>
                      <div className='image-holder'>
                        <img className="card-img rounded-circle"
                            src={instructor.image_path}/>
                      </div>
                      <div  className='container d-flex justify-content-center align-items-center' >
                        <h1>{instructor.first_name} {instructor.last_name}</h1>
                      </div>
                    </Card.Body>
                  </Card>)})
         : null }
         </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorSelect;
