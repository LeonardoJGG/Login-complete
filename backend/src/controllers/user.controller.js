import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {

    try {
        if(!req.body.email || !req.body.password) {
            return res.status(404).send({
                success: false,
                message: 'missing required data'
            })
        }

        const { email, password } = req.body;

        const checkUser = await User.findOne({ where: { email } });

        if(!checkUser){
            return res.status(404).send({
                success: false,
                message: 'User not found!'
            })
        }

        const checkPassword = await bcrypt.compare(password, checkUser.getDataValue('password'));

        if(!checkPassword){
            return res.status(404).send({
                success: false,
                message: 'Incorrect password!'
            });
        }
        
        const jwtPass = process.env.JWT_PASS;

        const authToken = jwt.sign({ id: checkUser.id }, jwtPass, { expiresIn: '5m'});

        return res.status(200).send({
            token: authToken,
            success: true,
            message: 'Login Successfull'
        });

    } catch (error) {
        res.status(400).send({
            message: error,
            success: false
        })
    }
}

export const Register = async (req, res) => {
    try {
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).send({
                success: false,
                message: 'missing required data'
            })
        }
    
        const { name, email, password } = req.body ;
    
        const alreadyExist = await User.findOne({ where: { email } });

        if(alreadyExist) {
            return res.status(400).send({
                message: 'This user already exist',
                success: false
            })
        }

        const hash_password = await bcrypt.hash(password, 10);

        const newUser = await User.build({
            name: name,
            email: email,
            password: hash_password
        }).save();

        res.send({
            success: true,
            message: 'User Created Successfully',
            name: newUser.getDataValue('name'),
            email: newUser.getDataValue('email'),
            user_id: newUser.getDataValue('id')
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'User creation failed'
        });
    }
}