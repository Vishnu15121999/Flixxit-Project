import React from 'react'
import { Badge } from '@mui/material';
import ContentModal from './ContentModal';


const getPosterPath = (posterPath) => {
    return `https://themoviedb.org/t/p/w220_and_h330_face/${posterPath}`
}

const avgRating = (vote_average) => {
    return `${(vote_average * 10).toFixed()}%`
}

const SingleContent = ({ id, title, poster, date, media_type, vote_average}) => {
    return (
            <ContentModal media_type={media_type} id={id}>
                <div className='card-content'>
                    <div className='card'>
                        <Badge className='badge' badgeContent={avgRating(vote_average)}
                            color={vote_average > 6 ? "primary" : 'secondary'} />
                        <img src={getPosterPath(poster)} alt={title}/>
                        <div className='card-details'>
                            <h3>{title}</h3>
                            {/**<p>{date}</p>**/}
                            {/**<p>{media_type}</p>**/}
                        </div>
                    </div>
                </div>
            </ContentModal>
    )
}

export default SingleContent