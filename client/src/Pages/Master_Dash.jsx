import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Avatar } from '@mui/material';

export default function Master_Dashboard() {
  const [enrolledPlayers, setEnrolledPlayers] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [tabValue, setTabValue] = useState(0); 

  useEffect(() => {
    const fetchEnrolledPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/sports/sprt_plyr"
        );
        setEnrolledPlayers(response.data);
      } catch (error) {
        console.error("Error fetching enrolled players:", error);
      }
    };

    fetchEnrolledPlayers();
  }, []);

  // Function to group players by sport
  const groupPlayersBySport = () => {
    const groupedPlayers = {};
    enrolledPlayers.forEach((player) => {
      const sportId = player.sportId?._id;
      if (!groupedPlayers[sportId]) {
        groupedPlayers[sportId] = {
          sport: player.sportId,
          players: [],
        };
      }
      groupedPlayers[sportId].players.push(player);
    });
    return Object.values(groupedPlayers);
  };

  // Function to handle click on sport
  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedSport(null); // Reset selected sport when changing tabs
  };

  // Function to generate path for gender icon image
  const getGenderIconPath = (gender) => {
    return gender === 'Male' ? './icons/man.png' : './icons/women.png';
  };

  return (
    <div className="container mx-auto p-8">
      <Typography variant="h4" align="center" className="text-white rounded-xl p-2 uppercase bg-red-950" gutterBottom>Sports</Typography>
      <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
        {groupPlayersBySport().map((group, index) => (
          <Tab key={index} label={group.sport?.name} />
        ))}
      </Tabs>
      <Grid container spacing={2}>
        {groupPlayersBySport().map((group, index) => (
          <Grid item xs={12} key={index}>
            {(tabValue === index || (selectedSport && selectedSport._id === group.sport?._id)) && (
              <>
                {group.players.length > 0 && (
                  <TableContainer component={Paper} className="mt-4">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Gender</TableCell> 
                          <TableCell>Name</TableCell>
                          <TableCell>Registration No</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Phone</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.players.map((player) => (
                          <TableRow key={player._id}>
                            <TableCell>
                              <Avatar alt="Gender Icon" src={getGenderIconPath(player.playerID?.Gender)} />
                            </TableCell>
                            <TableCell>{player.playerID?.Std_name}</TableCell>
                            <TableCell>{player.playerID?.Reg_no}</TableCell>
                            <TableCell>{player.playerID?.Dept_name}</TableCell>
                            <TableCell>{player.playerID?.Phone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
