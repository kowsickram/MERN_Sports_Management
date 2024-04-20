import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Fetch events from server
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sports/get_events');
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

 // Filter events based on time and date
const liveEvents = events.filter(event => new Date(event.date + 'T' + event.time) < new Date());
const upcomingEvents = events.filter(event => new Date(event.date + 'T' + event.time) > new Date());
const completedEvents = events.filter(event => new Date(event.date + 'T' + event.time) < new Date());


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div>
      
        <h2 align="center" className='m-2  text-white p-4 text-2xl bg-red-900 '><i>Welcome To RVS SPORTS</i></h2>
      <div className="p-6">
        <Slider {...settings}>
          <div className="p-4">
            <img src="./images/1.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/2.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/3.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/4.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/5.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/6.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/7.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          <div className="p-4">
            <img src="./images/8.png" alt="Sports 1" className=' rounded-lg' width={600} />
          </div>
          
        </Slider>
        <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="All Events" />
        <Tab label="Live Events" />
        <Tab label="Upcoming Events" />
        <Tab label="Completed Events" />
      </Tabs>
      {tabValue === 0 && (
          <Box boxShadow={7}>
            {events.map(event => (
              <div className="p-4 border border-gray-300 rounded-lg mb-4" key={event._id}>
                <p className="font-bold">{event.eventName}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            ))}
          </Box>
        )}

      {tabValue === 1 && (
          <Box>
            {liveEvents.map(event => (
              <div key={event._id}>
                <p>{event.eventName}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            ))}
          </Box>
        )}
        {tabValue === 2 && (
          <Box>
            {upcomingEvents.map(event => (
              <div key={event._id}>
                <p>{event.eventName}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            ))}
          </Box>
        )}
        {tabValue === 3 && (
          <Box>
            {completedEvents.map(event => (
              <div key={event._id}>
                <p>{event.eventName}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            ))}
          </Box>
        )}
      </div>
    </div>
  );
};

export default Home;
