import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MySports() {
  const player = JSON.parse(sessionStorage.getItem('player'));
  const [playerID, setPlayerID] = useState(null);
  const [enrolledSports, setEnrolledSports] = useState([]);

  useEffect(() => {
    fetchStudentId();
  }, []);

  useEffect(() => {
    if (playerID) {
      fetchEnrolledSports();
    }
  }, [playerID]);

  const fetchStudentId = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get_id', {
        params: {
          email: player.email,
          reg_no: player.reg_no,
        },
      });
      setPlayerID(response.data.id);
    } catch (error) {
      console.error('Error fetching student ID:', error);
    }
  };

  const fetchEnrolledSports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sports/my_sports', {
        params: {
          playerid: playerID,
        },
      });
      setEnrolledSports(response.data);
    } catch (error) {
      console.error('Error fetching enrolled sports:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
    <div className='flex flex-wrap flex-row bg-red-950 justify-center items-center p-2'> 
      <div className="ml-4 text-2xl text-white font-bold -4 text-center uppercase">My Sports</div>

     </div>
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledSports.map((sport) => (
          <div key={sport._id} className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl text-center font-semibold mb-2">{sport.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
