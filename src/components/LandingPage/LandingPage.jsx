import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from '../PortalInstructor/InstructorCalendar/InstructorCalendar';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className='container'>
      <div className="col">
        <div className="row justify-content-center">
          <div className="col-4">
            <h2 className='text-center'>Schedule</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <h2 className='text-center'>Plan</h2>
          </div>
          <div className='col-4'></div>
          <div className="col-4">
            <h2 className='text-center'>Meet</h2>
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
        



        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
              ut ex molestie blandit. Etiam et turpis sit amet risus mollis
              interdum. Suspendisse et justo vitae metus bibendum fringilla sed
              sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
              elementum eget. Praesent efficitur eros vitae nunc interdum, eu
              interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
              Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
              luctus. Duis a sapien metus.
            </p>

            <p>
              Praesent consectetur orci dui, id elementum eros facilisis id. Sed
              id dolor in augue porttitor faucibus eget sit amet ante. Nunc
              consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
              finibus metus facilisis. Nullam eget lectus non urna rhoncus
              accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
              euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
              lobortis augue mi vel felis. Duis ultrices sapien at est convallis
              congue.
            </p>

            <p>
              Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
              Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
              vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
              sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
              non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
              amet nisi.
            </p>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
  
  );
}

export default LandingPage;
