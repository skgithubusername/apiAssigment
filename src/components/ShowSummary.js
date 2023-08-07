import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css'; 


function ShowSummary() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [bookingFormVisible, setBookingFormVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingSuccessful, setBookingSuccessful] = useState(false);

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${id}`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      setUserName(userDetails.userName);
      setEmail(userDetails.email);
      setBookingFormVisible(false);
    }
  }, []);

  const handleBookTicketClick = () => {
    setBookingFormVisible(true);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    // Save user details to local storage
    const userDetails = { userName, email };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Reset form fields and hide the form
    setBookingFormVisible(false);
    setBookingSuccessful(true);
  };

  return (
    <div className="container m-5 " >
      {show && (
        <div >
          <h1>{show.name}</h1>
          <p>{show.summary}</p>
          <button onClick={handleBookTicketClick} class="btn btn-dark m-4">Book Ticket</button>

          {bookingFormVisible && !bookingSuccessful && (
            <form onSubmit={handleFormSubmit} >
                <h2>Book Movie Ticket</h2>
              <div class="mb-3">
                <label htmlFor="movieName" class="form-label">Movie Name:</label>
                <input type="text" class="form-control" id="movieName" value={show.name} disabled />
              </div>
              <div class="mb-3">
                <label htmlFor="userName" class="form-label">Your Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="userName"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  required
                />
              </div>
              <div class="mb-3">
                <label htmlFor="email" class="form-label">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
             
              <button type="submit" class="btn btn-dark">Submit</button>
            </form>
          )}

          {bookingSuccessful && (
            <p>Booking successful! Your details have been saved.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowSummary;

