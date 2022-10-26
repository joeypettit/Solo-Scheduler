import {DateTime} from 'luxon';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteConfirmModal({deleteModalShow, thisLessonInfo, setDeleteModalShow}){
    console.log('in ShowLessonInfo, this lesson is', thisLessonInfo);

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    return(
      <>
        <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <h1>Are you sure you want to cancel this lesson?</h1>
            <h1>Students: {thisLessonInfo.students_enrolled_ids[0]}</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setDeleteModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        
    )

}

export default ShowLessonInfo;