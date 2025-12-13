import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { MovieGrid } from "../components/MovieCard";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
