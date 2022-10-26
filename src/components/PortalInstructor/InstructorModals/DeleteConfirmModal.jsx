import {DateTime} from 'luxon';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from 'react-redux';

function DeleteConfirmModal({displayDeleteConfirmModal, thisLessonInfo, setDisplayDeleteConfirmModal}){
    const dispatch = useDispatch();
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

    return(
      <>
        <Modal show={displayDeleteConfirmModal}>
        <Modal.Header>
          <Modal.Title><h1>Are you sure you want to cancel this lesson?</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Students: {thisLessonInfo.students_enrolled_ids[0]}</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={()=>deleteEvent()}>
                Delete
            </Button>
            <Button variant="secondary" onClick={()=>setDisplayDeleteConfirmModal(false)}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
        
    )

}

export default DeleteConfirmModal;