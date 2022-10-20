import {useState} from 'react';
import {DateTime} from 'luxon';

function AddEventForm({setDisplayAddForm}){
    // track input values
    const [dateIn, setDateIn] = useState('');
    const [startTimeIn, setStartTimeIn] = useState('');
    const [lessonLengthIn, setLessonLengthIn] = useState(50);


    function addNewLesson(){
        const newLesson = {

        }

        setDisplayAddForm(false);

    }

    return(
        <div className="add-lesson-form">
            <label htmlFor="time-in" />
            <input type="date" value={dateIn} onChange={(e)=>setDateIn(e.target.value)}/>
            <label htmlFor="time-in">Time:</label>
            <input type="time" value={startTimeIn}  onChange={(e)=>setStartTimeIn(e.target.value)}/>
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