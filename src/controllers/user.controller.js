import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const userController = {
    createUser: async (req, res, next) => {
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
    },

    getUser: async (req, res, next) => {

    },

    updateUser: async (req, res, next) => {

    },

    deleteUser: async (req, res, next) => {

    }
};

export { userController };