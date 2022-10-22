import React from 'react';
import LogOutButton from '../../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import InstructorSchedule from '../InstructorSchedule/InstructorSchedule';
import {useHistory} from 'react-router-dom';

function InstructorHome() {

  const history = useHistory();
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Instructor Home</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <button className="btn" onClick={()=> history.push("/instructor-schedule")}>View Your Schedule</button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default InstructorHome;
