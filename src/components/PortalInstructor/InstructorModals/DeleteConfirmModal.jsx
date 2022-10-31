import {DateTime} from 'luxon';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import {useDispatch, useSelector} from 'react-redux';

function DeleteConfirmModal({displayDeleteConfirmModal, thisLessonInfo, setDisplayDeleteConfirmModal}){
    const dispatch = useDispatch();
    const studentList = useSelector(store=>store.allStudents);
    const [studentNames, setStudentNames] = useState();

    console.log('in DeleteConfirmModal, this lesson is', thisLessonInfo);

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    function deleteEvent(){
        //~~~ dispatch event id to lessons saga
        dispatch({
            type: 'DELETE_LESSON',
            payload: thisLessonInfo.lesson_id
        });

        setDisplayDeleteConfirmModal(false);
    }


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
  
      useEffect(getStudentNamesFromId, [displayDeleteConfirmModal]);


    return(
      <>
        <Modal show={displayDeleteConfirmModal}>
        <Modal.Header>
          <Modal.Title className='container text-center'><h2>Are you sure you want to cancel this lesson?</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className='container d-flex flex-column align-items-center'>
        <h1>{startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h1>
        <div className='container d-flex flex-column align-items-center'>
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
            <Button variant="secondary" onClick={()=>setDisplayDeleteConfirmModal(false)}>
                Close
            </Button>
            <Button variant="danger" onClick={()=>deleteEvent()}>
                Yes, Cancel This Lesson
            </Button>
        </Modal.Footer>
      </Modal>
    </>
        
    )

}

export default DeleteConfirmModal;