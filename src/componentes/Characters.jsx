import React, { useState, useEffect } from 'react'

const Characters = () => {
    const [characters, setCharacters] = useState([])

    const getCharacters = async () => {
        const response = await fetch('https://rickandmortyapi.com/api/character/');
        const data = await response.json();
        const results = data.results;
        setCharacters(results);
        console.log('results ->', results);
    }

    useEffect(() => {
        getCharacters();
    }, [])

    return (
        <div className="">
            <div className="Characters">
                {
                    characters.map( (character) => (
                        <div className="Character" key={character.name}>
                            <h2>{ character.name}</h2>
                            <figure>
                                <img src={character.image} alt={character.species} />
                                <figcaption>
                                    <p><b>Gender: </b> {character.gender}</p>
                                    <p><b>Origin: </b> {character.origin.name}</p>
                                    <p><b>Location: </b> {character.location.name}</p>
                                    <p><b>Specie: </b> {character.species}</p>
                                    <p><b>Status: </b> {character.status}</p>
                                </figcaption>
                            </figure>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Characters;