import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import InstructorHome from '../PortalInstructor/InstructorHome/InstructorHome';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
import StudentHome from '../PortalStudent/StudentHome/StudentHome';
import InstructorRoute from '../ProtectedRoutes/InstructorRoute';
import StudentRoute from '../ProtectedRoutes/StudentRoute';
import InstructorSchedule from '../PortalInstructor/InstructorSchedule/InstructorSchedule';
import StudentInstructorSelect from '../PortalStudent/LessonRegister/StudentInstructorSelect';
import StudentLessonSelect from '../PortalStudent/LessonRegister/StudentLessonSelect';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  console.log('User is:', user.id);
  console.log('user id is', user.id === 11)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []);

  return (
    <div className='container overflow-auto'>
      <Router>
        <Nav />
        <div className='d-flex justify-content-center my-4'>
        <Switch>
          
            {/* ~~~~~ Non-User Routes ~~~~~ */}
            <Redirect exact from="/" to="/home"/>
            
            <Route exact path="/home">
              {/* conditinal reder depending on role */}
              {user.id && user.is_instructor ? <Redirect to="/instructor-home" /> : null}
              {user.id && !user.is_instructor ? <Redirect to="/student-home" /> : null}
              {!user.id ? <LandingPage /> : null}
            </Route>
            
            <Route path ="/register">
              <RegisterPage />
            </Route>

            <Route exact path="/login">
              {user.id ? <Redirect to="/home" /> : <LoginPage /> }
            </Route>
            
            {/* ~~~~~ Student Routes ~~~~~ */}
            <StudentRoute exact path="/student-home">
              <StudentHome />
            </StudentRoute>
            <StudentRoute exact path="/student-instructor-select">
              <StudentInstructorSelect />
            </StudentRoute>
            <StudentRoute exact path="/student-lesson-select">
              <StudentLessonSelect />
            </StudentRoute>

            {/* ~~~~~ Instructor Routes ~~~~~ */}
            <InstructorRoute exact path="/instructor-home">
              <InstructorHome />
            </InstructorRoute>
            <InstructorRoute exact path="/instructor-schedule">
              <InstructorSchedule />
            </InstructorRoute>
            <InstructorRoute exact path="/instructor-history">
              <InstructorSchedule />
            </InstructorRoute>
 
            <Route>
                <h1>404</h1>
            </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
