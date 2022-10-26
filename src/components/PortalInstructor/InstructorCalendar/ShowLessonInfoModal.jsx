import {DateTime} from 'luxon';

function ShowLessonInfo({thisLessonInfo, setLessonModalInfoDisplayed}){
    console.log('in ShowLessonInfo, this lesson is', thisLessonInfo);

    const startTime = DateTime.fromISO((thisLessonInfo.start_time));
    const endTime = DateTime.fromISO((thisLessonInfo.end_time));

    return(
        <div>
            
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <h1>This Lesson:</h1>
            <h1>Students: {thisLessonInfo.students_enrolled_ids[0]}</h1>
            <h2>From: {startTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>To: {endTime.toLocaleString(DateTime.TIME_SIMPLE)}</h2>
            <h2>On: {startTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</h2>
        <button onClick={()=>setLessonModalInfoDisplayed(false)}>Back</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
        
      </div>
    </div>
  </div>
</div>
            
        </div> 
    )

}

export default ShowLessonInfo;