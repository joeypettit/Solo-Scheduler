const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
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

/*
 * POST route template
 */
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

router.delete('/delete-lesson/:lessonid', rejectUnauthenticated, (req, res) => {
    let lessonId = req.params.lessonid;
    let instructor_id = req.user.id;
    
    let queryText = `DELETE FROM "lessons" WHERE
                    "instructor_id" = $1 AND "id" = $2;`
    pool
        .query(queryText, [instructor_id, lessonId])
        .then((response) => res.sendStatus(204))
        .catch((error)=> {
            console.log('Errow with posting new lesson', error)
            res.sendStatus(500);
        });
});

module.exports = router;
