const router = require('express').Router();
const User = require('../model/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        status: "Active"
    })
    try{
        await user.save()
        res.status(200).json("Succesfully Saved!");
    }catch(err){
        res.status(400)
    }

})


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is incorrect')
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Email or password is incorrect')
    }

    //create token
    const toekn = jwt.sign({_id: user._id}, "1235")
    res.header('auth-token', token).send(token);

})
module.exports = router;
