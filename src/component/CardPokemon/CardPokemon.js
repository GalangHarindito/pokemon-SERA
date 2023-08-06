import React from "react";
import './style.css';

export default function CardPokemon(props) {
  const { data, onClick } = props;

  return (
    <section className='card'>
      {data.map((el, idx) => {
        return (
          <section className='card-container' key={idx} onClick={() => onClick(el.name)}>
            <section>
              <img src={`https://img.pokemondb.net/artwork/large/${el.name}.jpg`} alt="" />
            </section>
            
            <p>{el.name} </p>

          </section>
        );
      })}
    </section>
  );
}
