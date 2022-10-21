import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoutes/InstructorRoutes';
import LandingPage from '../LandingPage/LandingPage';
import AboutPage from '../AboutPage/AboutPage';
import HomeInstructor from '../PortalInstructor/InstructorHome/InstructorHome';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';
import StudentHome from '../PortalStudent/StudentHome/StudentHome';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <AboutPage />
      <HomeInstructor />
      <RegisterPage />
      <LandingPage />
      <StudentHome />
      
    </div>
  );
}

export default App;
