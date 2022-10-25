import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function RegisterForm() {
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
    event.preventDefault();

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
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        {username? usernameIsAvailable ? <div> ✅ Username Available!</div> : <div>❌ Username Unavailable</div> :null}
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => {
              setPassword(event.target.value),
              checkPasswordsMatch()}}
          />
        </label>
        {password? <div>{passwordFeedback}</div> : null}
      </div>
      <div>
        <label htmlFor="confirm-password">
          Confirm Password:
          <input
            type="password"
            name="confirm-password"
            value={confirmPassword}
            required
            onChange={(event) => {
              setConfirmPassword(event.target.value),
              checkPasswordsMatch()}}
          />
        </label>
      </div>
      <div>
        <label htmlFor="first-name">
          First Name:
          <input
            type="text"
            name="first-name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="last-name">
          Last Name:
          <input
            type="text"
            name="last-name"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
