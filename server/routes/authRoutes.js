const express = require("express");
const router  = express.Router();
 
// Student Registeration
const newReg = require("../controllers/authCont")
router.post('/plyr_reg', newReg.std_reg)
router.post('/plyr_log', newReg.std_log)
router.get('/get_id', newReg.std_id)

module.exports=router;