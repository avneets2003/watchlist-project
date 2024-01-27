import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Dialog, DialogContent, DialogActions, Button, Rating } from '@mui/material';
import axios from 'axios';

const Watchlist = ({ watchlist, setWatchlist }) => {
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`);
        setWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, [setWatchlist]);

  const handleDelete = async (movieId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/movies/${movieId}`);
      setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie from watchlist:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '50px' }}>
      {watchlist.map((movie, index) => (
        <Card key={index} style={{ position: 'relative', width: '300px', margin: '10px' }}>
          <CardContent>
            {movie.posterPath && (
              <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={`${movie.title} Poster`} style={{ width: '100%', marginBottom: '10px' }} />
            )}
            <Typography variant="h5" style={{ marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
              <a href={movie.link.startsWith('http') ? movie.link : `http://${movie.link}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000' }}>
                {movie.title}
              </a>
              
            </Typography>
            <Rating name="movie-rating" value={Math.round(movie.rating) / 2} precision={0.5} readOnly size="small" style={{ marginLeft: '5px' }} />
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Platform: {movie.platform}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Genre: {movie.genre}</Typography>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>Cast: {movie.cast.join(', ')}</Typography>
            <Box display="flex" justifyContent="flex-end" marginTop="10px">
              <Dialog open={deleteIndex === index} onClose={() => setDeleteIndex(null)}>
                <DialogContent style={{ maxWidth: '400px' }}>
                  <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    Are you sure you want to delete "{movie.title}" from the watchlist?
                  </Typography>
                  <DialogActions style={{ justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={handleDelete}>
                      Delete
                    </Button>
                    <Button variant="outlined" onClick={() => setDeleteIndex(null)}>
                      Cancel
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <Button variant="outlined" onClick={() => setDeleteIndex(index)}>Delete</Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Watchlist;
