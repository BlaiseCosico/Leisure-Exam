const express = require('express');
const router = express.Router();
const User = require('../model/user_model');
//Create is at register

//Read all users
router.get('/getAll', async (req, res) => {

    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        res.status(404)
    }

});

//Delete User

router.delete('/delete/:id', async (req,res) => {
    try{
        await User.findByIdAndRemove({"_id": req.params.id})
        res.send({'Message': 'Successfully Deleted.'})
    }catch(err){
        res.status(404).send("Delete Failed")
    }
	
	
})

module.exports = router;
