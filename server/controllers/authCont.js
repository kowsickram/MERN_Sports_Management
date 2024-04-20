const bcrypt = require('bcrypt');
const Player = require("../models/Player")


 exports.std_reg = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const player = new Player({
        Std_name: req.body.Std_name,
        Gender: req.body.Gender,
        Reg_no: req.body.Reg_no,
        Dept_name: req.body.Dept_name,
        Clg_name: req.body.Clg_name,
        Year: req.body.Year,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Pass: hashedPassword,
        DateOfBirth :req.body.DateOfBirth
      });
      console.log(req.body)
      await player.save();
      res.status(201).send('Player registered successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering player');
    }
  };


  exports.std_log = async (req, res) => {
    const { email, reg_no, password } = req.body;

    try {
      const player = await Player.findOne({ $or: [{ Email: email }, { Reg_no: reg_no }] });
  
      if (!player) {
        return res.status(400).json({ error: 'Invalid email, registration number, or password' });
      }
  
      const isMatch = await bcrypt.compare(password, player.Pass);
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email, registration number, or password' });
      }
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  exports.std_id = async (req, res) => {
    try {
      const { email, reg_no } = req.query;
      console.log(req.query)
      const player = await Player.findOne({ Email: email, Reg_no: reg_no });
      if (!player) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ id: player._id });
    } catch (error) {
      console.error('Error fetching student ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };