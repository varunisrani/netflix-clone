import { useState, useEffect } from "react";

const useTvData = (apiKey) => {
  const [tv, setTv] = useState([]);
  const [randomTv, setRandomTv] = useState(null);

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch TV shows");
        }

        const data = await response.json();

        if (data.results) {
          setTv(data.results);

          // Set a random TV show
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomTv(data.results[randomIndex]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTvData();
  }, [apiKey]);

  return { tv, randomTv };
};

export default useTvData;
