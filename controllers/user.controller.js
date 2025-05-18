import { generateToken } from '../models/user.model.js';
import users from '../users.js'
import bcrypt from 'bcrypt'

export const getAllUser = async (req, res, next) => {
    try{
        const users = await users.find();
        res.json(users);
    }
    catch (error) {
        next({message: error.message});
    }
}

export const signUp = async (req, res, next) => {
    try{
        const { username, email, password, role } = req.body;
        const user = new users({ username, email, password, role });
        await user.save();
        const token = generateToken(user);
        res.json({username: user.username, token});
    }catch (error) {
        next({message: error.message});
    }
}

export const signIn = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await users.findOne({email});
        if(!user) {
            return next({status: 401, message: "user is not found"});
        }
        const isAuth = await bcrypt.compare(password, user.password);
        if(!isAuth) {
            return next({status: 401, message: "password is not correct"});           
        }
        const token = generateToken(user);
        res.json({username: user.username, token});
    }catch (error) {
        next({message: error.message});
    }
}

export const updateUser = async (req, res, next) => {
    try{
        const pId = req.params.id;
        const { _id, username, email, password, role } = req.body;
        if(pId !== _id){
            return next({status: 409, message: "ID conflict"});
        }
        if(req.user._id !==pId){
            return next({status: 403, message:`user ${req.user._id} cannot update user ${pId}` });
        }
        const user = await users.findByIdAndUpdate(pId, {
            $set: { username, email, password, role },
        }, { new: true });
        res.status(200).json(user);
    }catch (error) {
        next({message: error.message});
    }
}