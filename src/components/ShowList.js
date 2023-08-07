import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'; 


function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="show-list container m-2 ">
      <h1>Show List</h1>
      <ul >
        {shows.map(show => (
          <li key={show.show.id} >
            <Link to={`/summary/${show.show.id}`}>{show.show.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowList;
