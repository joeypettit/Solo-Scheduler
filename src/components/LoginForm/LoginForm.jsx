import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Modal  from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LoginFormModal({displayLoginModal, setDisplayLoginModal}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>

      <Modal show={displayLoginModal} onHide={()=>setDisplayLoginModal(false)}>
        <Modal.Header>
          <Modal.Title ><h2>Login</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={login}>
            
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
              <div className="form-group">
                <div >
                  <label htmlFor="username" className='text-center my-3'>
                  Username:
                    <input
                      type="text"
                      name="username"
                      required
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </label>
              </div>
            </div>
            <div>
              <div >
                <label htmlFor="password" className='text-center my-3'>
                  Password:
                  <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className='text-center m-3'>
              <Button variant="secondary" className='mx-3' onClick={()=>setDisplayLoginModal(false)}>
                Back
              </Button>
              <Button variant="primary" type="submit" name="submit" className='mx-3'>
                Login
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>  
    </>
  );
}

export default LoginFormModal;
