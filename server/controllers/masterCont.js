const Master = require("../models/Master")



exports.mass_login = async (req, res) => {
    const { mastername, masterpass } = req.body;
    console.log(req.body)
  
    try {
      // Find the master by username
      const master = await Master.findOne({ mastername });
      console.log(master)
      if (!master) {
        return res.status(401).json({ message: 'Invalid mastername or password' });
      }
      // If credentials are valid, send a success response
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };