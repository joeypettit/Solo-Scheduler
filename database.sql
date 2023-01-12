ALTER TABLE "user" ADD "image_path" varchar(255);

-- SELECT STATEMENTS (for reference)
SELECT * FROM "lessons";
SELECT * FROM "user";
SELECT * FROM "students_lessons";

SELECT "student_id", "start_time", "end_time", "notes", "instructor_id" FROM "students_lessons"
JOIN "lessons" on "students_lessons"."lesson_id"="lessons"."id"
WHERE "student_id"= 1;


--TABLE ALTERATIONS (for reference)
ALTER TABLE "lessons" RENAME COLUMN "startime" TO "start_time";
ALTER TABLE "lessons" RENAME COLUMN "endtime" TO "end_time";


UPDATE "user" SET "username"='nadia' WHERE "id"=10;
UPDATE "user" SET "is_instructor"=true WHERE "id"=2;
UPDATE "user" SET "first_name"='Lee', "last_name"='B' WHERE "id"=13;
UPDATE "user" SET "is_instructor"=false WHERE "id"=2;



-- SELECT STATEMENTS -------------------------------------
SELECT * FROM "lessons" WHERE
"instructor_id" = 1;

SELECT * FROM "user" WHERE "is_instructor"=true; 

SELECT "id", "first_name", "last_name" FROM "user" WHERE "is_instructor"=true;

SELECT "start_time", "end_time", "notes" FROM "lessons"
JOIN "user_lessons" WHERE "user";

SELECT "last_name", "first_name", "instructor_id", "lessons"."id" AS "lesson_id", 
                        "start_time", "end_time" FROM "lessons"
                        JOIN "user" ON "user"."id" = "lessons"."instructor_id"
                        WHERE "instructor_id" = 1 AND "is_available"=true;
                        
SELECT * FROM "students_lessons" WHERE "lesson_id"=19;

SELECT "lessons"."id" AS "lesson_id", "last_name", "first_name", "instructor_id", 
                        "start_time", "end_time", array_agg("students_lessons"."student_id") AS "registered_student_ids" FROM "lessons"
                        JOIN "user" ON "user"."id" = "lessons"."instructor_id"
                        LEFT JOIN "students_lessons" ON "students_lessons"."lesson_id"="lessons"."id"
                        WHERE "instructor_id" = 2
                        GROUP BY "lessons"."id","last_name", "first_name", "instructor_id", 
                        "start_time", "end_time";


-- get class times for logged in instructor
SELECT "start_time", "end_time", "notes", "instructor_id", "lessons"."id" AS "lesson_id", array_agg("student_id") AS "students_enrolled_ids" FROM "lessons"
 LEFT JOIN "students_lessons" ON "lessons"."id" = "students_lessons"."lesson_id"
 WHERE "instructor_id" = 2
 GROUP BY  "instructor_id", "start_time", "end_time", "notes", "lessons"."id";
                        

-- DELETE STATEMENTS -------------------------------------

-- lessons router
DELETE FROM "lessons" WHERE
"instructor_id" = 1 AND "id"=1;


DELETE FROM "user" WHERE "id"=2;


-- deletes lesson reservation with a specific student
DELETE FROM "students_lessons" WHERE "student_id" = 1 AND "lesson_id"=15;



-- INSERT STATEMENTS -------------------------------------

-- insert open lesson time
INSERT INTO "lessons" 	("startime", "endtime", "instructor_id")
VALUES					('2022-10-27T12:00:00.000-05:00', '2022-10-27T12:50:00.000-05:00', '2');

INSERT INTO "lessons" ("start_time", "end_time", "instructor_id")
VALUES					('2022-10-27T12:00:00.000-05:00', '2022-10-27T12:50:00.000-05:00', '2');

INSERT INTO "student_lessons" ("lesson_id") VALUES ('2');

-- insert new instructor


-- UPDATE STATEMENTS --------------------------------------
UPDATE "lessons"


SELECT * FROM "lessons"
JOIN "user_lessons" on "user_lessons"."lesson_id"="lessons"."id";


-- CREATE TABLES -----------------------------

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"first_name" varchar(255),
	"email" varchar(255),
	"is_instructor" BOOLEAN NOT NULL DEFAULT FALSE,
	"is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
	"token_count" integer NOT NULL DEFAULT 20,
	"image_path" varchar(255),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "lessons" (
	"id" serial NOT NULL,
	"start_time" TIMESTAMP WITH TIME ZONE NOT NULL,
	"end_time" TIMESTAMP WITH TIME ZONE NOT NULL,
	"notes" varchar(255),
	"instructor_id" integer NOT NULL REFERENCES "user" ("id"),
	CONSTRAINT "lessons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "students_lessons" (
	"id" serial NOT NULL,
	"lesson_id" integer NOT NULL REFERENCES "lessons" ("id"),
	"student_id" integer REFERENCES "user" ("id"),
	CONSTRAINT "user_lessons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

-- create demo instructors
CREATE TABLE