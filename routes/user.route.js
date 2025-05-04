import users from "../users.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/sign-up", (req, res) =>{
    const newUser = req.body;
    const existingUser = users.find(user => user.name === newUser.name);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push(newUser);
    res.status(201).json(newUser);
});

router.post("/sign-in", (req, res) => {
    const { name, pass } = req.body;
    const user = users.find(user => user.name === name && user.pass === pass);
    if (user) {
        res.status(200).json({ message: "Login successful" });
    }
    else {
        res.status(401).json({ message: "Invalid login" });
    }
});

export default router;
