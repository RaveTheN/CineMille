import React, { useEffect, useState } from "react";

function App() {
  const numMovies = 6; //questa variabile serve per dire al codice quanti film prendere dalla lista
  const [movies, setMovies] = useState([]);
  const [programs, setPrograms] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=f95f6d8b229f5b9617dc9c0e25151e2c&language=it&page=1"
        );
        const movieData = await response.json();
        const filmList = movieData.results.slice(0, numMovies);

        setMovies(filmList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //poiché nella lista dei film presa in questa API non vi è la durata, il seguente codice genera
  //un numero random da 90 a oltre 180, come segnaposto ai minuti
  useEffect(() => {
    const newPrograms = () => {
      const filmDuration = 90 + Math.round(Math.random() * 120);
      return filmDuration;
    };
    setPrograms(newPrograms);
  }, [movies]);

  return (
    <div className="p-10">
      <h1 className="text-7xl font-extrabold inline ">
        Cine<h1 className="text-amber-400 inline">M</h1>ille
      </h1>
      <h2 className="text-3xl">programmazione</h2>
      <table className="">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4"></th>
            <th scope="col" className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => {
            return (
              <tr
                key={movie.id + index}
                className="border-b dark:border-neutral-500"
              >
                <td className="whitespace-nowrap px-6 py-4 w-60">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={`Locandina ${movie.title}`}
                  />
                </td>

                <td className="flex-col gap-2">
                  <div className="text-3xl my-2">{movie.title}</div>
                  <div name="sale" className="flex-row inline-flex gap-2">
                    <div>Sale: </div>
                    {/* nei due div a seguire, sono assegnate due sale per film,
                    rispetto alla loro posizione nell'array movies */}
                    <div className="bg-amber-300 rounded">
                      Sala {(index + 1) * 2 - 1}{" "}
                    </div>
                    <div className="bg-amber-300 rounded">
                      Sala {(index + 1) * 2}
                    </div>
                  </div>
                  {/* nel codice seguente, programs può essere sostituito
                  con una chiamata alla key che indica la durata del film,
                  es. "movie.runtime" */}
                  <div>Durata: {programs} </div>
                  <div>
                    Proiezioni:
                    {/* in questa sequenza, gli orari di programmazione che vengono mostrati
                    tengono conto della durata del film */}
                    {(programs >= 180 && <h3>17:00, 21:00, 23:00</h3>) ||
                      (programs >= 120 && <h3>17:00, 20:00, 22:30</h3>) ||
                      (programs >= 0 && <h3>17:00, 19:30, 22:00</h3>)}
                  </div>
                  <div className="p-2">{movie.overview}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
