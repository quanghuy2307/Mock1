import express from 'express';
import { pool } from './configs/dbConfig';
import { dotenv } from './configs/envConfig';
import bcrypt from 'bcrypt';
// import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

/* View Engine */
app.set('view engine', 'ejs');
app.set("views","./src/views");

app.use(express.static('./src/public'));
app.use(express.urlencoded({extended: false}));

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.use('/login', (req, res, next) => {
  res.render('login');
});

router.use('/home', (req, res, next) => {
  res.render('home');
});

router.post('/register', async (req, res, next) => {
  const {fullName, sex, birthday, phoneNumber, address, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    `INSERT INTO 
      users (full_name, birthday, sex, address, phone_number, email, password) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7);`, 
    [fullName, "2000-07-23", sex, phoneNumber, address, email, hashedPassword], 
    (error, results) => { 
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
  
  console.log({
    fullName,
    sex,
    birthday,
    phoneNumber,
    address,
    email,
    password,
    hashedPassword
  });

  res.end('');
});

// Gắn router vào app với prefix của url là /survey
app.use('/survey', router);

app.listen(process.env.PORT, () => console.log(`App listening at localhost:${process.env.PORT}`));