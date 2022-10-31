import {useState, useDispatch} from 'react-redux';
import {DateTime} from 'luxon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmCancellation({thisLessonInfo, setCancelModalDisplayed,cancelModalDisplayed}){
    const dispatch = useDispatch();

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    // this function will remove the student from the selected lesson time
    function CancelReservation(){
        // dispatch id of lesson to be cancelled
        dispatch({
            type: 'REMOVE_LESSON_RESERVATION',
            payload: thisLessonInfo
        });

        // close this modal
        setCancelModalDisplayed(false);
    }

    return(
        <>
        <Modal show={cancelModalDisplayed}>
        <Modal.Header>
          <Modal.Title className='container d-flex flex-row align-items-center justify-content-center'><h1>Are you sure you would like to cancel this lesson with {thisLessonInfo.first_name}?</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body className='container d-flex flex-column align-items-center justify-content-center'>
            <h1>{startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h1>
            <h4>From: <span className='lead'>{startTime.toLocaleString(DateTime.TIME_SIMPLE)}</span></h4>
            <h4>To: <span className='lead'>{endTime.toLocaleString(DateTime.TIME_SIMPLE)}</span></h4>
        </Modal.Body>
        <Modal.Footer className='container d-flex flex-row align-items-center justify-content-center'>
            <Button variant="secondary" onClick={()=>setCancelModalDisplayed(false)}>
                Close
            </Button>
            <Button variant="danger" onClick={()=>CancelReservation()}>
                Yes, Cancel This Lesson
            </Button>
        </Modal.Footer>
      </Modal>
    </>
    )

}

export default ConfirmCancellation;

