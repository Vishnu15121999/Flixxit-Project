import { Box, Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeMovie } from '../store';

const getPosterPath = (posterPath) => {
    return `https://themoviedb.org/t/p/w220_and_h330_face/${posterPath}`
}

const MyList = () => {
    const moviesList = useSelector((state) => state.movies.moviesList);
    const dispatch = useDispatch();
    const userData=useSelector((state)=>state.user.userDetails);
    console.log(userData[0].name);
   
    return (
        <div style={{ backgroundColor: 'rgb(21, 5, 5)' }}>
            <span className='pageTitle'>{userData[0].name}'s Watchlist</span>

            {
                moviesList.length !== 0 ? moviesList.map(list => (
                    <div className='ListContant' style={{
                        display: 'flex', alignItems: 'center', width: '90%',
                        backgroundColor: 'rgb(21, 5, 5)', marginTop: '10px', color: '#ccc', marginLeft: '80px', borderRadius: '10px'
                    }} key={list.id}>
                        <Box>
                            <img style={{ padding: '10px' }} src={getPosterPath(list.poster_path)} alt={list.title || list.name} />
                        </Box>
                        <Box>
                            <h3 style={{ margin: '15px 10px' }}>{list.title || list.name}</h3>
                            <h5 style={{ margin: '15px 10px' }}>Genres : {list.genres[0].name}</h5>
                            <h5 style={{ margin: '15px 10px' }}>{list.overview}</h5>
                            <Button variant='contained' color='warning' sx={{ borderRadius: 10, margin: 5 }} onClick={() => dispatch(removeMovie(list.id))}>Remove</Button>
                        </Box>
                    </div>
                )) : <h3 style={{ color: 'white', textAlign: 'center' }}>No Movies</h3>
            }
        </div>
    )
}

export default MyList