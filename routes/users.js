const express = require('express');
const {createUser,deleteUser,getAllUsers,getUserByID,updateUser} = require('../controls/users')
const router = express.Router();


router.get('/',getAllUsers);

router.get('/:id',getUserByID);

router.post('/',createUser);

router.patch('/:id',updateUser);

router.delete('/:id',deleteUser);


module.exports = router;