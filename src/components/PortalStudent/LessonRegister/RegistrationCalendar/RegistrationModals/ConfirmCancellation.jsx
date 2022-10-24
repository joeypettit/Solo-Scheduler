import {useState, useDispatch} from 'react-redux';
import {DateTime} from 'luxon';

function ConfirmCancellation({lessonToCancel, setCancelModalDisplayed}){
    const dispatch = useDispatch();

    const startTime = DateTime.fromISO((lessonToCancel.start_time));
    const endTime = DateTime.fromISO((lessonToCancel.end_time));

    // this function will remove the student from the selected lesson time
    function CancelReservation(){
        // dispatch id of lesson to be cancelled
        dispatch({
            type: 'REMOVE_LESSON_RESERVATION',
            payload: lessonToCancel
        });

        // close this modal
        setCancelModalDisplayed(false);
    }



    return(
        <div>
            <h1>Are you sure you would like to cancel this lesson with {lessonToCancel.first_name}?</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)} </h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
            <button onClick={()=> CancelReservation()}>Confirm</button>
            <button onClick={()=> setCancelModalDisplayed(false)}>Back</button>
        </div>
        
    )

}

export default ConfirmCancellation;