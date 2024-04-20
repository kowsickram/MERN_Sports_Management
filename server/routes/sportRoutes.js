const express = require('express');
const router = express.Router();

const sport_control = require("../controllers/sportCont")
router.get('/get_sports',sport_control.get_sport);
router.post('/enroll',sport_control.enroll_sport);
router.post('/add_event',sport_control.add_event);
router.get('/get_events',sport_control.get_event);

router.get('/my_sports',sport_control.enrolled_sport);
router.get('/sprt_plyr',sport_control.enroll_plyr);


module.exports = router;
