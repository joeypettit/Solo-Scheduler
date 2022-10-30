import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function RegisterForm({displayRegistrationModal, setDisplayRegistrationModal}) {
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [usernameIsAvailable, setUsernameIsAvailable] = useState();

  const [password, setPassword] = useState(''); // track user input
  const [confirmPassword, setConfirmPassword] = useState(''); // track user input
  const [approvedPassword, setApprovedPassword] =useState(''); // track user input
  const [passwordFeedback, setPasswordFeedback] = useState(''); // give feedback back to user on password choice

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  


  function checkPasswordsMatch(){
    if(password.length < 6){
      setPasswordFeedback('Password must be at least 6 characters');
    }
    else if(password === confirmPassword){
      setPasswordFeedback('✅ Passwords Match!');      
      setApprovedPassword(password);
    } else if(password !== confirmPassword){
      setPasswordFeedback('Passwords do not match');      
      setApprovedPassword('');
    }
  }

  // fire axios request to check current user name against all others
  // response from axios gives back a boolean for isAvailable
  function checkUserNameMatch(){
    axios.get(`/api/user/checkusername/${username}`)
      .then((response)=>{
        console.log('in checkUserNameMatch', response.data);
        setUsernameIsAvailable(response.data);

      })
      .catch((error)=>console.log('error with checking user name', error));

  }

  const registerUser = (event) => {
    console.log('in registerUser:', username, password);

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,

        
      },
    });
  };

  useEffect(()=>checkPasswordsMatch(),[password, confirmPassword]);
  useEffect(()=> {
    let timer = setTimeout(()=>checkUserNameMatch(), 1500)
    return ()=>clearTimeout(timer);
  }, [username]);

  return (
    <>
        <Modal show={displayRegistrationModal}>
        <Modal.Header>
          <Modal.Title className='container text-center'><h2>Registration</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body className='container d-flex flex-column align-items-center'>
        <div className='container d-flex flex-column align-items-center'>
          <form className="formPanel">
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="username"><h5>Username:</h5></label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              {username? usernameIsAvailable ? <div> ✅ Username Available!</div> : <div>❌ Username Unavailable</div> :null}
            </div>
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="password"><h5>Password:</h5></label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(event) => {
                    setPassword(event.target.value),
                    checkPasswordsMatch()}}
                />
              
              {password? <div>{passwordFeedback}</div> : null}
            </div>
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="confirm-password"><h5>Confirm Password:</h5></label>
                <input
                  type="password"
                  name="confirm-password"
                  value={confirmPassword}
                  required
                  onChange={(event) => {
                    setConfirmPassword(event.target.value),
                    checkPasswordsMatch()}}
                />
              
            </div>
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="first-name"><h5>First Name:</h5></label>
                <input
                  type="text"
                  name="first-name"
                  value={firstName}
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                />
              
            </div>
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="last-name"><h5>Last Name:</h5></label>
                <input
                  type="text"
                  name="last-name"
                  value={lastName}
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div className='container d-flex flex-column justify-content-center bg-light p-1 m-1 align-items-center shadow-sm'>
              <label htmlFor="email"><h5>Email:</h5></label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div  className='container d-flex flex-row justify-content-center bg-light p-1 m-1 shadow-sm'>
            <Button variant="secondary" className='mx-3' onClick={()=>setDisplayRegistrationModal(false)}>
                Close
            </Button>
            <Button variant="primary" className='mx-3' onClick={()=>registerUser()}>
                Register
            </Button>
            </div>
          </form>
          </div>
        </Modal.Body>
      </Modal>
    
    
    </>
  );
}

export default RegisterForm;
