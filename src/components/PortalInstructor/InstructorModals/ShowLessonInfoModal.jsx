import {DateTime} from 'luxon';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShowLessonInfo({show, thisLessonInfo, setShow}){
    console.log('in ShowLessonInfo, this lesson is', thisLessonInfo);

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    return(
      <>
        <Modal show={show}>
        <Modal.Header>
          <Modal.Title><h1>{startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>With: {thisLessonInfo.students_enrolled_ids[0]}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        
    )

}

export default ShowLessonInfo;