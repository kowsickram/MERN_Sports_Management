const express = require("express");
const router  = express.Router();
 
// Student Registeration
const MasterAuth = require("../controllers/masterCont")
router.post('/login', MasterAuth.mass_login)


module.exports=router;