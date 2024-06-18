import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzYyMDQyYmVhNDg0NzhkMjY4NGZkMmViM2M2YmI0YyIsInN1YiI6IjY2NmQyMTJiY2I4OTVhNWM2Y2NlNWMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dGJJGgp6oNt1Iri1be6rDxpToegoFAJS1mo1JQPGojs'
    }
  };

  const [apiData, setApi] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.results && data.results.length > 0) {
          setApi(data.results[0]);
        } else {
          console.error("No video data found");
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-2)} />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at.slice(0 ,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
