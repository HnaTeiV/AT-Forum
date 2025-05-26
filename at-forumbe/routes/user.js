const express= require('express');
const router= express.Router();
const userController=require('../controllers/user.js');

router.get('/',userController.getAllUsers);
router.get('/:username',userController.getUserByUserName);
router.post('/',userController.addUser);
router.delete('/',userController.deleteUser);
router.put('/updateUser',userController.updateUser);
module.exports=router;
