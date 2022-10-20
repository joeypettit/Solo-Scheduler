
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


----------------- FIRST SEQUEL EXPORT (SCHEDULER) ------------------------
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"skype_username" varchar(255),
	"timezone" varchar(255),
	"is_instructor" BOOLEAN NOT NULL DEFAULT FALSE,
	"is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
	"token_count" integer NOT NULL DEFAULT 20,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "lessons" (
	"id" serial NOT NULL,
	"startime" TIMESTAMP WITH TIME ZONE NOT NULL,
	"endtime" TIMESTAMP WITH TIME ZONE NOT NULL,
	"notes" varchar(255),
	"is_complete" BOOLEAN NOT NULL DEFAULT FALSE,
	"is_available" BOOLEAN NOT NULL DEFAULT TRUE,
	"instructor_id" integer NOT NULL REFERENCES "user" ("id"),
	CONSTRAINT "lessons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


SELECT * FROM "user";

CREATE TABLE "user_lessons" (
	"id" serial NOT NULL,
	"lesson_id" integer NOT NULL REFERENCES "lessons" ("id"),
	"user_id" integer NOT NULL REFERENCES "user" ("id"),
	CONSTRAINT "user_lessons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public.weekly_template" (
	"id" serial NOT NULL,
	"day" varchar(255) NOT NULL,
	"start_time" TIME NOT NULL,
	"length" integer NOT NULL,
	"instructor_id" integer NOT NULL,
	CONSTRAINT "weekly_template_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.announcements" (
	"id" serial NOT NULL,
	"text" varchar(255) NOT NULL,
	"admin_id" BINARY NOT NULL,
	"datetime" TIMESTAMP NOT NULL,
	CONSTRAINT "announcements_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "lessons" ADD CONSTRAINT "lessons_fk0" FOREIGN KEY ("instructor_id") REFERENCES "user"("id");

ALTER TABLE "people_lessons" ADD CONSTRAINT "people_lessons_fk0" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id");
ALTER TABLE "people_lessons" ADD CONSTRAINT "people_lessons_fk1" FOREIGN KEY ("person_id") REFERENCES "user"("id");

ALTER TABLE "weekly_template" ADD CONSTRAINT "weekly_template_fk0" FOREIGN KEY ("instructor_id") REFERENCES "user"("id");

ALTER TABLE "announcements" ADD CONSTRAINT "announcements_fk0" FOREIGN KEY ("admin_id") REFERENCES "user"("id");


--------------------------------------------------


