import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SportsList() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const player = JSON.parse(sessionStorage.getItem("player"));
  const [playerID, setPlayerID] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    fetchStudentId();
    fetchSports();
  }, []);
  const fetchStudentId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get_id",
        {
          params: {
            email: player.email,
            reg_no: player.reg_no,
          },
        }
        );
      setPlayerID(response.data.id);
      console.log(response.data.id)
    } catch (error) {
      console.error("Error fetching student ID:", error);
    }
  };
  
  
  const fetchSports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sports/get_sports");
      setSports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const handleEnroll = async () => {
    try {
      await axios.post("http://localhost:5000/sports/enroll", {
        playerID: playerID,
        sportId: selectedSport._id
      });
      setDialogOpen(false);
      toast.success("Enrolled Successfully")
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="container mx-auto p-8">
    <div className="flex flex-row w-full p-2 bg-red-950 justify-center items-center flex-wrap ">
    <img src="./icons/trophy1.png" alt="trophy" width={40} />
      <div className="text-2xl text-white ml-4 text-center font-semibold uppercase ">Sports</div>
      </div>
      
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className=" p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports.map((sport) => (
            <Card key={sport._id} className="max-w-md">
              <CardContent>
                <h2 className="text-xl text-center p-2 font-semibold uppercase mb-2">
                  {sport.name}
                </h2>
                <div className="flex justify-center items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={() => {
                      setSelectedSport(sport);
                      setDialogOpen(true);
                    }}
                  >
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to enroll in {selectedSport && selectedSport.name}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEnroll} color="primary">
            Enroll
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}


