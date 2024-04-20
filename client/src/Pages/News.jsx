import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const News = () => {
  const newsItems = [
    { date: '05 Mar', title: '38th Annual SPORTS DAY 2024', category: 'SPORTS' },
    { date: '01 Oct', title: '2nd Padmavathi Ammal Memorial Trophy State Level Deadlift Championship 2023', category: 'SPORTS' },
    { date: '15 Sept', title: 'B.COM IT- INTRA DEPARTMENT VOLLEY BALL MATCH', category: 'COMMERCE' },
    { date: '24 Mar', title: 'B.COM(IT)-INTRA DEPARTMENT CRICKET MATCH', category: 'COMMERCE' },
    { date: '04 Sept', title: 'Padmavathi Ammal Memorial Trophy - Open State level Deadlift Championship 2022', category: 'SPORTS' }
  ];

  return (
    <Grid container spacing={3} justifyContent="center">
      {newsItems.map((item, index) => (
        <Grid item key={index}>
          <Card variant="outlined" style={{ width: 300 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {item.date}
              </Typography>
              <Typography variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography color="textSecondary">
                Category: {item.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default News;
