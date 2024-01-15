import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CustomPagination from './CustomPagination';
import SingleContent from './SingleContent';


const SearchSection = () => {
    const [value, setValue] = useState();
    const [page, setPage] = useState(1);
    const [searchText, setsearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${value ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchSearch();
    }, [value, page]);



    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: 'flex', margin: "15px 0px" }}>
                    <TextField style={{ flex: 1 }} className='searchBox' variant='filled'
                        onChange={(e) => setsearchText(e.target.value)} />
                    <Button onClick={fetchSearch} variant='contained' style={{ marginLeft: 10 }}>
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs value={value} onChange={(e, val) => { setValue(val); setPage(1) }} indicatorColor="secondary" textColor='black' style={{ paddingBottom: 5 }}>
                    <Tab style={{ width: "100%", marginRight: '600px' }} label="Search Movies" />
                    <Tab style={{ width: "100%" }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className='trending'>
                {content && content.map((item) => (
                    <SingleContent key={item.id} id={item.id}
                        poster={item.poster_path} title={item.title || item.name}
                        date={item.release_date || item.first_air_date} media_type={value ? "tv" : "movie"}
                        vote_average={item.vote_average} />
                ))}
            {searchText && !content && (
                value ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>
            )}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default SearchSection