import {useState, useEffect} from 'react';
import {DateTime} from 'luxon';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEventForm({setDisplayAddFormModal, displayAddFormModal, dateToAdd}){
    const dispatch = useDispatch();

    // ~~~ track input values with state
    const [dateIn, setDateIn] = useState(dateToAdd);
    const [startTimeIn, setStartTimeIn] = useState('12:00');
    const [lessonLengthIn, setLessonLengthIn] = useState(50);

    //~~~ this function grabs values from inputs, formats the data, and sends to redux to POST
    function addNewLesson(){
        // console.log('in addNewLesson, dateIn:', dateIn, 'time:', startTimeIn, 'length:', lessonLengthIn);

        //~~~ Build starttime (in iso 8601 format) from pieces of user input data
        const lessonDate = DateTime.fromISO(dateIn);
        const lessonStartTime = DateTime.fromISO(startTimeIn);
        console.log('lesson start time is', lessonStartTime);
        const starttimeObj = lessonDate.set({hours: lessonStartTime.hour, minutes: lessonStartTime.minute}).toUTC();
        // console.log('STARTDATE is', lessonDate.toISO());
        // console.log('STARTTIME is', lessonStartTime.toISO());
        console.log('starttime obj is', starttimeObj.toISO());

        //~~~ calculate end time from start time using user input
        const endtimeObj = starttimeObj.plus({minutes: lessonLengthIn}).toUTC();
        console.log('endtimeObj', endtimeObj.toSQL());
        
    
        //~~~ lesson object to send to POST
        const newLessonObj = {
            start_time: starttimeObj.toSQL(),
            end_time: endtimeObj.toSQL()
        }

        //~~~ dispatch lesson object to saga
        dispatch({
            type: 'ADD_LESSON',
            payload: newLessonObj
        })

        //~~~ modify state to close Add Event modal
        setDisplayAddFormModal(false);
    }

    useEffect(()=>setDateIn(dateToAdd),[dateToAdd]);

    return(
        
        <>
        <Modal show={displayAddFormModal}>
        <Modal.Header>
          <Modal.Title><h1>Add a New Lesson Time</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <label htmlFor="time-in" />
                <input type="date" value={dateIn ? dateIn : dateToAdd} onChange={(e)=>setDateIn(e.target.value)}/>
                <label htmlFor="time-in">Time:</label>
                <input type="time" value={startTimeIn} onChange={(e)=>setStartTimeIn(e.target.value)}/>
                <label htmlFor="length-in">Lesson Length</label>
                <select id="length-in" value={lessonLengthIn} onChange={(e)=>setLessonLengthIn(e.target.value)}>
                    <option value={50}>50 minutes</option>
                    <option value={110}>110 minutes</option>
                </select>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=>addNewLesson()}>
                Add
            </Button>
            <Button variant="secondary" onClick={()=>setDisplayAddFormModal(false)}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default AddEventForm;