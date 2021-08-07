import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Search";

const initialState = {
  favorites: [],
};
const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const getCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();
    const results = data.results;
    setCharacters(results);
  };
  useEffect(() => {
    getCharacters();
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };


  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search] //array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed
  );

  return (
    <div className="">
      <div className="favoritesCharacters">
        {favorites.favorites.map((favorite) => (
          <li className="listFavorites" key={favorite.id}>
            <figure className="favoritesSamples">
              <img src={favorite.image} alt={favorite.species} />
            </figure>
          </li>
        ))}
      </div>
      <b>Filtrar por nombre:</b>

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <h1>Filtrados:</h1>
      <div className="Characters">
        {filteredUsers.map((character) => (
          <div className="Character" key={character.id}>
            <h2>{character.name}</h2>
            <figure>
              <img src={character.image} alt={character.species} />
              <figcaption>
                <p>
                  <b>Gender: </b> {character.gender}
                </p>
                <p>
                  <b>Origin: </b> {character.origin.name}
                </p>
                <p>
                  <b>Location: </b> {character.location.name}
                </p>
                <p>
                  <b>Specie: </b> {character.species}
                </p>
                <p>
                  <b>Status: </b> {character.status}
                </p>
              </figcaption>
            </figure>
            <button onClick={() => handleClick(character)}>
              Agregar a favoritos!
            </button>
          </div>
        ))}
      </div>

      <h1>Sin filtrar:</h1>
      <div className="Characters">
        {characters.map((character) => (
          <div className="Character" key={character.id}>
            <h2>{character.name}</h2>
            <figure>
              <img src={character.image} alt={character.species} />
              <figcaption>
                <p>
                  <b>Gender: </b> {character.gender}
                </p>
                <p>
                  <b>Origin: </b> {character.origin.name}
                </p>
                <p>
                  <b>Location: </b> {character.location.name}
                </p>
                <p>
                  <b>Specie: </b> {character.species}
                </p>
                <p>
                  <b>Status: </b> {character.status}
                </p>
              </figcaption>
            </figure>
            <button onClick={() => handleClick(character)}>
              Agregar a favoritos!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
