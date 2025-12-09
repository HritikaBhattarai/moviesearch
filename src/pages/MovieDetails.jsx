// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from "../config";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`)
      .then((res) => res.json())
      .then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="container">
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Year}</p>
      <p>{movie.Plot}</p>

      <button
        onClick={() =>
          isFav ? removeFavorite(movie.imdbID) : addFavorite(movie)
        }
      >
        {isFav ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
