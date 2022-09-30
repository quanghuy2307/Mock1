-- DROP TABLE "options", "questions", "results", "token_accesses", "token_refreshes", "user_options", "user_questions", "users";

CREATE TABLE IF NOT EXISTS "users" (
    "user_id" SERIAL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
	"birthday" DATE NOT NULL,
	"sex" VARCHAR(6) NOT NULL, -- Male/Female/Others
	"address" VARCHAR(50) NOT NULL,
	"phone_number" VARCHAR(10) NOT NULL,
	"email" VARCHAR(50) UNIQUE NOT NULL,
	"password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS "token_refreshes" (
    "token_refresh_id" SERIAL,
	"user_id" INT,
    "value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"expried_at" TIMESTAMP NOT NULL,
	PRIMARY KEY (token_refresh_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS "token_accesses" (
    "token_access_id" SERIAL,
	"token_refresh_id" INT,
    "value" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"expried_at" TIMESTAMP NOT NULL,
	PRIMARY KEY (token_access_id),
	FOREIGN KEY (token_refresh_id) REFERENCES token_refreshes(token_refresh_id)
);

CREATE TABLE IF NOT EXISTS "results" (
    "result_id" SERIAL,
	"user_id" INT,
	"correct" INT,
	"incorrect" INT,
	"no_answer" INT,
	"total" INT,
	"score" INT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (result_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS "questions" (
    "question_id" SERIAL,
	"content" TEXT UNIQUE NOT NULL,
	"score" INT NOT NULL,
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (question_id)
);

CREATE TABLE IF NOT EXISTS "options" (
    "option_id" SERIAL,
	"question_id" INT,
	"content" TEXT UNIQUE NOT NULL,
	"is_correct" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (option_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS "user_options" (
    "user_option_id" SERIAL,
	"user_id" INT,
	"question_id" INT,
	"option_id" INT,
	"is_choice" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_option_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id),
	FOREIGN KEY (option_id) REFERENCES options(option_id)
);

CREATE TABLE IF NOT EXISTS "user_questions" (
    "user_question_id" SERIAL,
	"user_id" INT,
	"question_id" INT,
	"answer" VARCHAR(5) NOT NULL, --True/False/None
	"created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_question_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
);