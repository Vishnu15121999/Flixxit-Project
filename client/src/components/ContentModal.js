import { Button, Fade, Box, Backdrop, Modal, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useDispatch } from 'react-redux';
import { addMovieToWatchList } from '../store/index';
import GradeIcon from '@mui/icons-material/Grade';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const style = {
    position: 'absolute',
    marginTop: '30px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '100vh',
    bgcolor: 'rgb(2,0,36)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
};

const getPosterPath = (posterPath) => {
    return `https://themoviedb.org/t/p/w220_and_h330_face/${posterPath}`
}

const ContentModal = ({ children, media_type, id }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const [isLiked, setIsliked] = useState(false);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
        //console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        //console.log(data);
        setVideo(data.results[0]?.key);
        //console.log(video)
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Button className='container' onClick={handleOpen}>{children}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}>
                <Fade in={open}>
                    {content && (
                        <Box sx={style}>
                            <div className='ContentModal'>
                                <div sx={{ marginLeft: 15, width: '700px', height: '100vh' }}>
                                    <iframe className='video-frame' src={`https://www.youtube.com/embed/${video}`} title='myFrame' controls></iframe>
                                </div>
                            </div>
                            <hr />
                            <>
                                <div className='content-modal-container'>
                                    <div className='content-modal-image'>
                                        {<img src={getPosterPath(content.poster_path)}
                                            alt={content.title || content.name} className='contectImg' />}
                                    </div>
                                    <div className='contentDetails'>
                                        <span className='details'>
                                            {content.name || content.title}(
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                '.....'
                                            ).substring(0, 4)}
                                            )
                                        </span>
                                        <hr />
                                        <span className='ratings'>Imdb Ratings : <GradeIcon></GradeIcon> {content.vote_average}</span>
                                        {content.tagline && (
                                            <i className='tagline'>{content.tagline}</i>
                                        )}
                                        <span className='contentDesc'>
                                            - {content.overview}
                                        </span>
                                        <Box className='like-box'>
                                            <span style={{ margin: '5px' }}>Total Likes : {`${isLiked ? content.vote_count + 1 : content.vote_count}`}</span>
                                            <IconButton><ThumbUpIcon sx={{color : (isLiked) ? 'red' : 'white'}} onClick={() => setIsliked(!isLiked)} color='warning'></ThumbUpIcon></IconButton>
                                        </Box>
                                        <div className='buttons'>
                                            <Button sx={{ marginRight: '10px' }}
                                                variant='contained'
                                                startIcon={<YouTubeIcon />}
                                                color='secondary'
                                                target='_blank'
                                                href={`https://www.youtube.com/watch?v=${video}`}>Watch The Trailer</Button>
                                            <Button onClick={() => dispatch(addMovieToWatchList(content))} variant='contained' color='secondary'>Add to Fovourites</Button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <h5 color='white'>trending</h5>
                            </>
                        </Box>)}
                </Fade>
            </Modal>
        </>
    )
}

export default ContentModal;
//https://www.youtube.com/embed/cCrZfBME9Gc