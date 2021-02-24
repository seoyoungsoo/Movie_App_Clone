import React from 'react'
import { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMG_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row, Button } from 'antd';

function MovieDetail(props) {

  let movieId = props.match.params.movieId
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)

  useEffect(() => {

    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

    let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    fetch(endPointInfo)
      .then(response => response.json())
      .then(response => {
        //console.log(response)
        setMovie(response)
      })

      fetch(endPointCrew)
      .then(response => response.json())
      .then(response => {
        //console.log('responseforCrew', response)
        setCasts(response.cast)
      })
  }, [])

  const moreActorView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>

      {/* Header */}

      <MainImage 
        image={`${IMG_BASE_URL}w1280${Movie.backdrop_path}`} 
        title={Movie.original_title}
        text={Movie.overview}
      
      />


      {/* Body */}
      <div style={{width:'58%', margin:'1rem auto'}}>

        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <Favorite 
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem('userId')}
          />
        </div>

        {/* Movie Info */}

        <MovieInfo 
          movie={Movie}
        />

        <br />
        {/* Actor Grid */}

        <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
          <Button onClick={moreActorView}>Toggle Actor View</Button>
        </div>

        {ActorToggle &&
          <Row gutter={[16, 16]}>
                
          {Casts && Casts.map((cast, index) => (
            <React.Fragment key={index}>
              <GridCards 
                image={cast.profile_path ?
                  `${IMG_BASE_URL}w500${cast.profile_path}`: null}
                actorName={cast.name}
              />

            </React.Fragment>
            ))}

        </Row>
        }

      </div>
      
    </div>
  )
}

export default MovieDetail
