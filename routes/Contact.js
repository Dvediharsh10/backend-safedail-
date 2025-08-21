const express=require('express')
const router=express.Router();

const {auth}=require('../middlewares/auth');
const {syncContacts,getAllContacts,markUnmarkFav,getFavourites}=require('../controllers/Contacts')


router.post('/sync',auth,syncContacts)
router.get('/getAllContacts',auth,getAllContacts)
router.post('/markunmarkfavourite',auth,markUnmarkFav);
router.get('/getfavourites',auth,getFavourites);


module.exports=router;