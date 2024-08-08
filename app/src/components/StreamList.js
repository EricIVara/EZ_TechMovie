// src/components/StreamList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "./styles/StreamList.css";

const StreamList = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState("");
  const [eventList, setEventList] = useState([]);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    setEvent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.trim() === "") {
      alert("Movie name cannot be empty.");
      return;
    }
    setEventList([...eventList, event]);
    setEvent("");
  };

  const handleDelete = (index) => {
    const newList = eventList.filter((_, i) => i !== index);
    setEventList(newList);
  };

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  return (
    <div className="streamlist-container">
      <form onSubmit={handleSubmit} className="streamlist-form">
        <label htmlFor="event">Favorite Movies</label>
        <input
          type="text"
          id="event"
          placeholder="Enter Movie..."
          value={event}
          onChange={handleInputChange}
        />
        <div className="button-group">
          <button type="submit">Add Movie</button>
          <button type="button" onClick={toggleDeleteButtons}>
            Toggle Delete
          </button>
        </div>
      </form>
      <ul className="movie-list">
        {eventList.map((event, index) => (
          <li key={index} className="movie-item">
            {event}
            {showDeleteButtons && (
              <button
                onClick={() => handleDelete(index)}
                className="delete-button"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
