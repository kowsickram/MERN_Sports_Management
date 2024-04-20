const Sport = require("../models/Sport");
const Event = require("../models/Event")
const EnrollPlyr = require("../models/Sport_enroll")


exports.get_sport = async (req, res) => {
  try {
    // Fetch all sports from the database
    const sports = await Sport.find({}, 'name description');

    // Send the fetched sports data as a JSON response
    res.json(sports);
  } catch (error) {
    // Handle errors
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.enroll_sport = async (req, res) => {
  try {
    const { playerID, sportId } = req.body;
    console.log(req.body)
    // Check if the enrollment already exists
    const existingEnrollment = await EnrollPlyr.findOne({ playerID, sportId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this sport." });
    }
    // Create a new enrollment document
    const enrollment = new EnrollPlyr({ playerID, sportId });
    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful." });
  } catch (error) {
    console.error("Error enrolling:", error);
    res.status(500).json({ message: "Error enrolling." });
  }
};

// Route to get enrolled events for a student
exports.enrolled_sport = async (req, res) => {
  try {
   const playerID = req.query.playerid; 
   
   const enrolledSports = await EnrollPlyr.find({ playerID }).populate('sportId');
   const sportsData = enrolledSports.map(enrolledSports => enrolledSports.sportId);
  

   res.status(200).json(sportsData);
 } catch (error) {
   console.error('Error fetching enrolled events:', error);
   res.status(500).json({ message: 'Internal server error' });
 }
};

exports.enroll_plyr =  async (req, res) => {
  try {
    const enrolledplayers = await EnrollPlyr.find().populate('playerID').populate('sportId');
    res.json(enrolledplayers);
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.add_event = async (req, res) => {
  try {
    const { eventName, sport, date, time, location } = req.body;
    console.log(req.body);
    const newEvent = new Event({ eventName, sport, date, time, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.get_event = async (req, res) => {
  try {
    const events = await Event.find();
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};