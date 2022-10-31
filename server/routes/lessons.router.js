const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// this route selects the schedule of the currently logged in instructor
router.get('/instructor', rejectUnauthenticated, (req, res) => {
    let instructor_id = req.user.id;

    let queryText = `SELECT "start_time", "end_time", "notes", "instructor_id", "lessons"."id" AS "lesson_id", array_agg("student_id") AS "students_enrolled_ids" FROM "lessons"
                        LEFT JOIN "students_lessons" ON "lessons"."id" = "students_lessons"."lesson_id"
                        WHERE "instructor_id" = $1
                        GROUP BY  "instructor_id", "start_time", "end_time", "notes", "lessons"."id"
                        ORDER BY "start_time";`
                    
    pool
    .query(queryText,[instructor_id])
    .then((response)=> res.send(response.rows))
    .catch((error) => {
        console.log('Error Selecting lessons', error);
        res.sendStatus(500);
    });
});


//~~~ this route will select all of the logged in student's lessons with all instructors.
router.get('/student/', rejectUnauthenticated, (req, res) => {
    let student_id = req.user.id;

    let queryText = `SELECT "student_id", "start_time", "end_time", "notes", "instructor_id" FROM "students_lessons"
                    JOIN "lessons" on "students_lessons"."lesson_id"="lessons"."id"
                    WHERE "student_id"= $1;`;
                    
    pool
    .query(queryText,[student_id])
    .then((response)=> res.send(response.rows))
    .catch((error) => {
        console.log('Error Selecting student lessons', error);
        res.sendStatus(500);
    });


})

// this route selects the available lessons of an instructor (by a different user (student))
// returns an object with instructor info and array of lesson objects (from lessons table)
router.get('/instructor/:instructorid', rejectUnauthenticated, (req, res) => {
    let instructor_id = req.params.instructorid;
    console.log('in instructor route', instructor_id);

    let queryText = `SELECT "lessons"."id" AS "lesson_id", "last_name", "first_name", "instructor_id", 
                        "start_time", "end_time", array_agg("students_lessons"."student_id") AS "registered_students_ids" FROM "lessons"
                        JOIN "user" ON "user"."id" = "lessons"."instructor_id"
                        LEFT JOIN "students_lessons" ON "students_lessons"."lesson_id"="lessons"."id"
                        WHERE "instructor_id" = $1
                        GROUP BY "lessons"."id","last_name", "first_name", "instructor_id", 
                        "start_time", "end_time";`;
    pool
    .query(queryText,[instructor_id])
    .then((response)=> {
        console.log('in Select available lessons route', response.rows);
        res.send(response.rows);
    })
    .catch((error) => {
        console.log('Error Selecting lessons', error);
        res.sendStatus(500);
    });
});

// this route will reserve the lesson of included ID for the logged in user(student)
router.post('/reserve-lesson/:lessonid', rejectUnauthenticated, (req, res) => {
    let lessonId = req.params.lessonid;
    let studentId = req.user.id;
    console.log('in reserve lesson route, student id is', studentId,'lesson id is', lessonId);
    
    let queryText = `INSERT INTO "students_lessons" ("student_id", "lesson_id")
                                            VALUES  ($1, $2);`;            
    pool
    .query(queryText, [studentId, lessonId])
    .then((response)=> res.sendStatus(201))
    .catch((error)=>console.log('Error with reserving lesson', error));
});

// removes logged in student's reservation of a specific lesson
router.delete('/remove-reservation/:lessonid', rejectUnauthenticated, (req, res)=>{
    let lessonId = req.params.lessonid;
    let studentId = req.user.id;

    let queryText = `DELETE FROM "students_lessons" WHERE "student_id" = $1 AND "lesson_id"=$2;`;

    pool
    .query(queryText, [studentId, lessonId])
    .then((response)=> res.sendStatus(204))
    .catch((error) => console.log('Error with Deleting Lesson Reservation', error)); 
})



// this allows instructor to add an available lesson time.
router.post('/add-lesson', rejectUnauthenticated, (req, res) => {
    let {start_time, end_time} = req.body;
    let instructor_id = req.user.id;

    console.log('IN ADD LESSON ROUTE, id=', req.user.id, 'start=', start_time, 'end=', end_time);
    
    let queryText = `INSERT INTO "lessons" 	("start_time", "end_time", "instructor_id")
                        VALUES					($1, $2, $3);`
    pool
    .query(queryText, [start_time, end_time, instructor_id])
    .then((response) => res.sendStatus(201))
    .catch((error)=> {
        console.log('Errow with posting new lesson', error)
        res.sendStatus(500);
    });
});

// This router allows an instructor to delete an available lesson time.
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
        .catch((error) => console.log('Error with second delete query'));
    })  
    .catch((error)=> {
        console.log('Error with deleting lesson', error)
        res.sendStatus(500);
    });
});

module.exports = router;
