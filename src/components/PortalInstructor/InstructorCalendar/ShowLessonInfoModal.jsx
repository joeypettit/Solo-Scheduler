import {DateTime} from 'luxon';

function ShowLessonInfo({thisLessonInfo, setLessonModalInfoDisplayed}){
    console.log('in ShowLessonInfo, this lesson is', thisLessonInfo);

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    return(
        <div>
          <h1>This Lesson:</h1>
            <h1>Students: {thisLessonInfo.students_enrolled_ids[0]}</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
          <button onClick={()=>setLessonModalInfoDisplayed(false)}>Back</button>
      </div>
    )

}

export default ShowLessonInfo;