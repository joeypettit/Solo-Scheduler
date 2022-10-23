const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// this route selects the schedule of the currently logged in instructor
router.get('/instructor', rejectUnauthenticated, (req, res) => {
    let instructor_id = req.user.id;

    let queryText = `SELECT * FROM "lessons" WHERE
                    "instructor_id" = $1;`
    pool
    .query(queryText,[instructor_id])
    .then((response)=> res.send(response.rows))
    .catch((error) => {
        console.log('Error Selecting lessons', error);
        res.sendStatus(500);
    });
})

// this route selects the available lessons of an instructor (by a different user (student))
// returns an object with instructor info and array of lesson objects (from lessons table)
router.get('/instructor/:instructorid', rejectUnauthenticated, (req, res) => {
    let instructor_id = req.params.instructorid;

    let queryText = `SELECT "last_name", "first_name", "instructor_id", "lessons"."id" AS "lesson_id", 
                        "start_time", "end_time" FROM "lessons"
                        JOIN "user" ON "user"."id" = "lessons"."instructor_id"
                        WHERE "instructor_id" = $1 AND "is_available"=true;`
    pool
    .query(queryText,[instructor_id])
    .then((response)=> {
        console.log('in Select available lessons route', response.rows);
        res.send(response.rows)
    })
    .catch((error) => {
        console.log('Error Selecting lessons', error);
        res.sendStatus(500);
    });
})

// this route will reserve the lesson of included ID for the logged in user
router.put('/reserve-lesson/:lessonid', rejectUnauthenticated, (req, res) => {
    let lessonId = req.params.lessonid;
    
    let queryText = ``;



})



/*
 * POST route template
 */
router.post('/add-lesson', rejectUnauthenticated, (req, res) => {
    let {start_time, end_time} = req.body;
    let instructor_id = req.user.id;

    console.log('IN ADD LESSON ROUTE, id=', req.user.id, 'start=', start_time, 'end=', end_time);
    
    let queryText = `INSERT INTO "lessons" 	("start_time", "end_time", "instructor_id")
                    VALUES					($1, $2, $3) RETURNING "lessons"."id";`
    pool
    .query(queryText, [start_time, end_time, instructor_id])
    .then((response) => {
        console.log('in the response,', response.rows[0].id);
        let queryText2 = `INSERT INTO "students_lessons" ("lesson_id") VALUES ($1);`;

        pool
        .query(queryText2, [response.rows[0].id])
        .then((response2) => res.sendStatus(201))
        .catch(error => console.log('Error with inserting into join table', error));
        })
    .catch((error)=> {
        console.log('Errow with posting new lesson', error)
        res.sendStatus(500);
    });
});

router.delete('/delete-lesson/:lessonid', rejectUnauthenticated, (req, res) => {
    let lessonId = req.params.lessonid;
    let instructor_id = req.user.id;
    
    let queryText = `DELETE FROM "students_lessons" WHERE "lesson_id"=$1;` 
    pool
    .query(queryText, [lessonId])
    .then((response) => {
        let queryText2 = `DELETE FROM "lessons" WHERE
                            "instructor_id" = $1 AND "id" = $2;`
        pool
        .query(queryText2, [instructor_id, lessonId])
        .then((response) => res.sendStatus(204))
    })  
    .catch((error)=> {
        console.log('Errow with deleting lesson', error)
        res.sendStatus(500);
    });
});

module.exports = router;
