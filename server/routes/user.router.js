const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


// ~~~ NON-AUTHENTICATION END POINTS

//~~~ Fetches all Instructors
router.get('/all-instructors', rejectUnauthenticated, (req, res) => {
  console.log()
  let queryText = `SELECT "id", "first_name", "last_name" FROM "user" WHERE "is_instructor"=true;`;
  pool
  .query(queryText)
  .then((response)=>{
    console.log('in all-instructors', response.rows);
    res.send(response.rows)
  }).catch((error) => console.log('Error SELECTing instructors'));
})


// get array of all current usernames, check if sent username is taken,
// send back boolean for isAvailable
router.get('/checkusername/:username', (req, res) => {
  console.log('incoming username', req.params.username);
  let usernameToCheck = req.params.username;
  let queryText = `SELECT "username" FROM "user"`;
  
  pool
  .query(queryText)
  .then((response)=>{
    console.log('in checkusername, usernameToCheck is', usernameToCheck);
    console.log('in checkusername', response.rows);

    let isAvailable = true;
    for(item of response.rows){
      console.log('in for loop',item.username, usernameToCheck);
      if(item.username===usernameToCheck){
        isAvailable = false;
        break;
      }
    }
    console.log('isAvailable is', isAvailable);
    res.send(isAvailable);
  }).catch((error) => console.log('Error checking username'));
});



module.exports = router;
