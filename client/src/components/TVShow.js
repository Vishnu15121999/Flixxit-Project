import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleContent from './SingleContent';
import CustomPagination from './CustomPagination';
import Genre from './Genre';
import useGenre from '../hooks/useGenres';

const TVShow = () => {
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState([]);
  const [content, setContent] = useState([]);
  const [genres,setGenres]=useState([]);
  const [selectedGenres,setselectedGenres]=useState([]);
  const genreforURL=useGenre(selectedGenres);
  //console.log(genres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
    //console.log(data);
    setContent(data.results);
    setNumOfPage(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
  }, [page,genreforURL]);


  return (
    <div>
      <span className='pageTitle'>TV Series</span>
      <Genre type="tv" genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setselectedGenres={setselectedGenres} setPage={setPage}/>
      <div className='trending'>
        {content && content.map((item) => (
          <SingleContent key={item.id} id={item.id}
            poster={item.poster_path} title={item.title || item.name}
            date={item.release_date || item.first_air_date} media_type='tv'
            vote_average={item.vote_average} />
        ))}
      </div>
      {numOfPage > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPage} />
      )}
    </div>
  )
}

export default TVShow;