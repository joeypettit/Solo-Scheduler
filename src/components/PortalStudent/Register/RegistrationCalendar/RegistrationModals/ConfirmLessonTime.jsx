import {DateTime} from 'luxon';
import {useDispatch} from 'react-redux';

function ConfirmLessonTime({lessonToSchedule}){
    const dispatch = useDispatch();

    console.log('in ConfirmLessonTime', lessonToSchedule);
    const startTime = DateTime.fromISO((lessonToSchedule.start_time));
    const endTime = DateTime.fromISO((lessonToSchedule.end_time));
    const date = startTime
    const dayOfWeek = startTime.weekdayLong
    console.log('day of week is', endTime);

    function reserveLesson(){
        dispatch({
            type: 'RESERVE_LESSON_TIME',
            payload: lessonToSchedule
        })
    }

    return (
        <div>
            <h1>You would like to schedule the following class with {lessonToSchedule.first_name}</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)} </h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
            <button onClick={()=>reserveLesson()}>Confirm</button>
            <button>Back</button> 
        </div>  
    )
}

export default ConfirmLessonTime;