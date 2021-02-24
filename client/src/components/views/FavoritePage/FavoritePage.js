import React, { useEffect, useState } from 'react';
import './favorite.css';
import axios from 'axios';
import { Button, Popover } from 'antd';
import { IMG_BASE_URL } from '../../Config';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    
    fetchFavoredMovie()

  }, [])

  const fetchFavoredMovie = () => {
    axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId')})
      .then(res => {
        if(res.data.success) {
          console.log(res.data)
          setFavorites(res.data.favorites)
        } else {
          alert("영화 정보를 가져오는데 실패했습니다.")
        }
      })
  }

  const onClickDelete = (movieId, userFrom) => {
    
    const variables = {
      movieId,
      userFrom
    }

    axios.post('/api/favorite/removeFromFavorite', variables)
    .then(res => {
      if(res.data.success) {
        fetchFavoredMovie()
      } else {
        alert("항목을 지우는데 실패했습니다.")
      }
    })
  }

  const renderCards = Favorites.map((favorite, index) => {
    
    const content = (
      <div>
        {favorite.moviePost ?
          <img src={`${IMG_BASE_URL}w300${favorite.moviePost}`} /> : "no image"
        }
      </div>
    )
    
    return <tr key={index}>
      
      <Popover content={content} title={`${favorite.movieTitle}`}>
        <td>{favorite.movieTitle}</td>
      </Popover>

      <td>{favorite.movieRunTime} mins</td>
      <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
    </tr>
  })


  return (
    <div sytle={{width:'85%', margin:'3rem auto'}}>
      <h2> Favorite Movies </h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>

      </table>
      
    </div>
  )
}

export default FavoritePage
