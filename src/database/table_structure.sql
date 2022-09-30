CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
	birthday DATE,
	sex BOOLEAN,
	address VARCHAR(50),
	phone_number VARCHAR(10),
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS tokens (
    token_id SERIAL,
	user_id INT,
    value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (token_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS results (
    result_id SERIAL,
	user_id INT,
	correct INT,
	incorrect INT,
	no_answer INT,
	total INT,
	score INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (result_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS questions (
    question_id SERIAL,
	content TEXT UNIQUE NOT NULL,
	score INT NOT NULL,
	PRIMARY KEY (question_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS options (
    option_id SERIAL,
	question_id INT,
	content TEXT UNIQUE NOT NULL,
	is_correct BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (option_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS user_options (
    user_option_id SERIAL,
	user_id INT,
	question_id INT,
	option_id INT,
	is_choice BOOLEAN,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_option_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id),
	FOREIGN KEY (option_id) REFERENCES options(option_id)
);

CREATE TABLE IF NOT EXISTS user_questions (
    user_question_id SERIAL,
	user_id INT,
	question_id INT,
	answer BOOLEAN,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_question_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
);