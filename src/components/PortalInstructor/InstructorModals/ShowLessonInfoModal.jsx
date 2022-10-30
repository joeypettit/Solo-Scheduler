import {DateTime} from 'luxon';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useSelector} from 'react-redux';
import Badge from 'react-bootstrap/Badge';


function ShowLessonInfo({displayLessonInfoModal, thisLessonInfo, setDisplayLessonInfoModal}){
    console.log('in ShowLessonInfo, this lesson is', thisLessonInfo);
    const studentList = useSelector(store=>store.allStudents);

    const [studentNames, setStudentNames] = useState();
    console.log('student names is', studentNames);
    

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));
    // this array contains the names of all students in this lesson (just one for now)
    

    function getStudentNamesFromId(){
      const names =[];
      if(thisLessonInfo.students_enrolled_ids.includes(null)){
        return setStudentNames(['None']);
      } else {
        for(let student of studentList){
          if(thisLessonInfo.students_enrolled_ids.includes(student.id)){
            names.push(`${student.first_name} ${student.last_name}`);
          }
        }
      }
      return setStudentNames(names);  
    }

    useEffect(getStudentNamesFromId, [displayLessonInfoModal]);


    return(
      <>
        <Modal show={displayLessonInfoModal}>
        <Modal.Header>
          <Modal.Title className='container d-flex flex-column align-items-center'><h2>This Lesson</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container d-flex flex-column align-items-center'>
            <h1>{startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h1>
            <h4>From: <span className='lead'>{startTime.toLocaleString(DateTime.TIME_SIMPLE)}</span></h4>
            <h4>To: <span className='lead'>{endTime.toLocaleString(DateTime.TIME_SIMPLE)}</span></h4>
            <h4>Students: <span className='lead'>{studentNames && studentNames.map((student, index)=>{
              if(student === 'None'){
                return <Badge key={index} bg="warning">{student}</Badge>;
              } else{
                return <Badge key={index} bg="success">{student}</Badge>;
              }    
            })}</span></h4>
          </div>
        </Modal.Body>
        <Modal.Footer className='container d-flex flex-row justify-content-center'>
          <Button variant="secondary" onClick={()=>setDisplayLessonInfoModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        
    )

}

export default ShowLessonInfo;