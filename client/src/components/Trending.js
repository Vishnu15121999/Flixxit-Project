import axios from 'axios';
import React, {useState, useEffect } from 'react';
import SingleContent from './SingleContent';

const Trending = () => {
  const[content,setContent]=useState([]);
  const[page,setPage]=useState(1);
  
  const fetchTrend=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    //console.log(data.results);
    setContent(data.results);
  }
  useEffect(()=>{
    fetchTrend();
    // eslint-disable-next-line
  },[page])

  return (
    <div className='main-trending'>
      <span className='pageTitle'>Trending 20</span>
      <div className='trending-page'>
        <div className='trending-sub'>
        <h1>Welcome.Millions of movies, TV shows and people to discover. Explore now.</h1>
        </div>
      </div>
      <hr></hr>
      <div className='trending'>
      {content && content.map((item)=>(
        <SingleContent key={item.id} id={item.id}
        poster={item.poster_path} title={item.title || item.name}
        date={item.release_date || item.first_air_date}media_type={item.media_type} 
        vote_average={item.vote_average} vote_count={item.vote_count}/>
      ))}
      </div>
    </div>
  )
}

export default Trending