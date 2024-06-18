import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import card_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({title, category}) => {

  const [apiData, setApi] = useState([])
  const cardsRef = useRef();

  const API_KEY = 'YOUR_TMDB_API_KEY';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzYyMDQyYmVhNDg0NzhkMjY4NGZkMmViM2M2YmI0YyIsInN1YiI6IjY2NmQyMTJiY2I4OTVhNWM2Y2NlNWMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dGJJGgp6oNt1Iri1be6rDxpToegoFAJS1mo1JQPGojs'
    }
  };
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?api_key=${API_KEY}&language=en-US&page=1`, options)
  
    .then(response => response.json())
    .then(response => setApi(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

 
  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to = {`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
