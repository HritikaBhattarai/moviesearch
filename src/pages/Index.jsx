import React, { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../config";
import { MovieGrid } from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Index() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query = "Avengers") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") setMovies(data.Search);
      else setError(data.Error);
    } catch (err) {
      setError("Failed to fetch movies.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="home-wrapper">
      <section className="hero">
        <h1> Discover <span>Movies</span></h1>
        
        <div className="hero-search">
          <SearchBar onSearch={fetchMovies} />
        </div>

        <div className="popular-tags">
          <span>Popular searches:</span>
          <button onClick={() => fetchMovies("Avengers")}>Avengers</button>
          <button onClick={() => fetchMovies("Batman")}>Batman</button>
          <button onClick={() => fetchMovies("Spiderman")}>Spider Man</button>
          <button onClick={() => fetchMovies("Inception")}>Inception</button>
          <button onClick={() => fetchMovies("Home")}>Home</button>
          </div>
      </section>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <MovieGrid movies={movies} />}
    </div>
  );
}
