SELECT user_id FROM users WHERE email = 'hant23072000@gmail.com';

INSERT INTO 
	users (full_name, birthday, sex, address, phone_number, email, password) 
VALUES 
	('Le Long', '2000-09-18', 'Male', 'Ha Noi', '0982339221', 'longnn@gmail.com', '123456789') 
RETURNING *;