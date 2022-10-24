import {useState, useDispatch} from 'react-redux';

function ConfirmCancellation({lessonToCancel, setCancelModalDisplayed}){
    const dispatch = useDispatch();

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
            <h1>Are you sure you would like to cancel this lesson?</h1>
            <button onClick={()=> CancelReservation()}>Confirm</button>
            <button onClick={()=> setCancelModalDisplayed(false)}>Back</button>
        </div>
        
    )

}

export default ConfirmCancellation;