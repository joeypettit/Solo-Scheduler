import {DateTime} from 'luxon';
import {useDispatch} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmLessonTime({thisLessonInfo, confirmModalDisplayed, setConfirmModalDisplayed, setSuccessModalDisplayed}){
    const dispatch = useDispatch();

    console.log('in ConfirmLessonTime', thisLessonInfo);
    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));
    const date = startTime
    const dayOfWeek = startTime.weekdayLong
    console.log('day of week is', endTime);

    function reserveLesson(){
        dispatch({
            type: 'RESERVE_LESSON_TIME',
            payload: thisLessonInfo
        })
        // close this modal
        setConfirmModalDisplayed(false);
        // open registration successful modal
        setSuccessModalDisplayed(true);
    }

    return (
        <>
            <Modal show={confirmModalDisplayed}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>You would like to schedule the following class with {thisLessonInfo.first_name}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)} </h2>
                    <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
                    <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>reserveLesson()}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={()=>setConfirmModalDisplayed(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmLessonTime;