import {useState} from 'react';
import {DateTime} from 'luxon';

function AddEventForm({setDisplayAddForm, dateToAddTo}){
    // track input values
    const [dateIn, setDateIn] = useState(dateToAddTo);
    const [startTimeIn, setStartTimeIn] = useState('12:00');
    const [lessonLengthIn, setLessonLengthIn] = useState(50);
    console.log('inAddEventForm', );


    function addNewLesson(){
        // console.log('in addNewLesson, dateIn:', dateIn, 'time:', startTimeIn, 'length:', lessonLengthIn);

        //~~~ Build starttime (in iso 8601 format) from pieces of user input data
        const lessonDate = DateTime.fromISO(dateIn);
        const lessonStartTime = DateTime.fromISO(startTimeIn);
        const starttimeObj = lessonDate.set({hours: lessonStartTime.hour, minutes: lessonStartTime.minute});
        // console.log('STARTDATE is', lessonDate.toISO());
        // console.log('STARTTIME is', lessonStartTime.toISO());
        // console.log(starttime.toISO());

        const endtimeObj = starttimeObj.plus({minutes: lessonLengthIn});
        console.log('start time object,', starttimeObj.toISO()); 
        console.log('end time object', endtimeObj.toISO());


        const newLessonObj = {
            starttime: starttimeObj.toISO(),
            endtime: endtimeObj.toISO()
        }

        setDisplayAddForm(false);
    }

    return(
        <div className="add-lesson-form">
            <label htmlFor="time-in" />
            <input type="date" value={dateIn ? dateIn : dateToAddTo} onChange={(e)=>setDateIn(e.target.value)}/>
            <label htmlFor="time-in">Time:</label>
            <input type="time" value={startTimeIn} onChange={(e)=>setStartTimeIn(e.target.value)}/>
            <label htmlFor="length-in">Lesson Length</label>
            <select id="length-in" value={lessonLengthIn} onChange={(e)=>setLessonLengthIn(e.target.value)}>
                <option value={50}>50 minutes</option>
                <option value={110}>110 minutes</option>
            </select>
            <button onClick={()=>addNewLesson()}>Add Lesson</button>
        </div>
    )
}

export default AddEventForm;