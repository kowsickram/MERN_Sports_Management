import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SportsList() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchSports();
  });

  
  
  const fetchSports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sports/get_sports");
      setSports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sports:", error);
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
}


