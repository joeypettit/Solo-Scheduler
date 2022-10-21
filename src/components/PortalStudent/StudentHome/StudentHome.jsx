import React from 'react';
import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import InstructorSchedule from '../InstructorSchedule/InstructorSchedule';

function StudentHome() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
        <h1>Student Home</h1>
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
        <StudentSchedule />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default StudentHome;
