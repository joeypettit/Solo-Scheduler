import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from '../PortalInstructor/InstructorCalendar/InstructorCalendar';
import Button from 'react-bootstrap/Button';
import './LandingPage.css';
import LoginFormModal from '../LoginForm/LoginForm';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className=' container'>
        <div className='container'>
          <div className="col">
              <div className="row justify-content-center">
                <div className="col-4">
                  <h5 className='text-center'>Schedule</h5>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-4">
                  <h3 className='text-center'>Plan</h3>
                </div>
                <div className='col-4'></div>
                <div className="col-4">
                  <h3 className='text-center'>Meet</h3>
                </div>
            </div>
          </div>
          
        <div className="row my-4">
        <div className="col-4"></div>
          <div className="col-4">
          <div className='d-flex flex-row justify-content-center'>
            <div className='text-primary '>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
            </div>
              <h1 className='mx-2 pe-3 border-bottom text-muted'>fecha</h1>
          </div>
      </div>
      <div className="col-4"></div>
          </div>
      </div>

      <div className="container">
        <hr/>
        <p className='lead text-muted text-center m-5'>
          fetcha is the solution to scheduling your virtual lessons quickly and efficiently.
          Across town or across the world, fetcha has you covered.
        </p>
      </div>
      <div className='container d-flex justify-content-center'>
        <Button variant='primary' className='mx-3'>Register</Button>
        <Button variant='primary' className='mx-3' onClick={()=>setDisplayLoginModal(true)}> Log In</Button>
      </div>

      {displayLoginModal && <LoginFormModal displayLoginModal={displayLoginModal} setDisplayLoginModal={setDisplayLoginModal}/>}

    </div>


  
  );
}

export default LandingPage;
