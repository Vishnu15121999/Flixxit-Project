import React, { useEffect } from 'react'
import { Chip } from '@mui/material'
import axios from 'axios'

const Genre = ({ genres, setGenres, type, selectedGenres, setselectedGenres, setPage }) => {

  const handleAdd = (genre) => {
    setselectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  }

  const handleRemove = (genre) => {
    setselectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenres(data?.genres);
  }
  useEffect(() => {
    fetchGenres();
  }, [])
  return (
    <div style={{ padding: "6px 0" , backgroundColor:'rgb(53, 12, 12)'}}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 , fontWeight:'bold' , color:'white'}}
          label={genre.name}
          key={genre.id}
          color="secondary"
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 , fontWeight:'bold' , color:'white'}}
          label={genre.name}
          key={genre.id}
          clickable
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genre