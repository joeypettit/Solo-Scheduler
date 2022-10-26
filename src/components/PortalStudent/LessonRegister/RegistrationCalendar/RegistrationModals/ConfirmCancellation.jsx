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
          <Modal.Title><h1>Are you sure you would like to cancel this lesson with {thisLessonInfo.first_name}?</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)} </h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={()=>CancelReservation()}>
                Delete
            </Button>
            <Button variant="secondary" onClick={()=>setCancelModalDisplayed(false)}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
    )

}

export default ConfirmCancellation;

