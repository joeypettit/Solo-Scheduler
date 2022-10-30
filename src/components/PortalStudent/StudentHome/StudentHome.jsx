import React from 'react';
import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import StudentSchedule from '../StudentSchedule/StudentSchedule';
import {useHistory} from 'react-router-dom';
import Button from 'react-bootstrap/Button'

function StudentHome() {
    const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h1>Student Home</h1>
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <Button variant="outline-primary" onClick={()=> history.push("/student-instructor-select")}>Schedule Lessons</Button>
            <LogOutButton className="btn" />
        </div>
  );
}

// this allows us to use <App /> in index.js
export default StudentHome;
