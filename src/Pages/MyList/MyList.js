import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPokemonList } from './action';
import './style.css';
import Button from "../../component/button/Button";
import { Link } from "react-router-dom";
export default function MyList() {
  const dispatch = useDispatch();
  const { data } = useSelector(s => s.myList);
  const { dataStatusStore } = useSelector(s => s.detailPokemon)

  useEffect(() => {
    dispatch(getPokemonList())
  },[])

  useEffect(() => {
    if(dataStatusStore === 200){
      dispatch(getPokemonList())
    }
  },[dataStatusStore])


  return(
    <section className='myList'>
      <h3>Your Pokemon Collection</h3>
      <Link to='/'>Home</Link>
      <Card data={data} />
    </section>
  )
}

function Card(props) {
  const { data, onClick } = props;
  return (
    <section className='card'>
      {data.length >=1 ? data.map((el, idx) => {
        return (
          <section className='card-container' key={idx}>
            <section>
              <img src={`https://img.pokemondb.net/artwork/large/${el.pokemonName}.jpg`} alt="" />
            </section>
            <p>{el.pokemonName} </p>
            <p>{el.name}</p>
            <br />
            <Button label='Release!!' />
          </section>
        );
      }) : <h3>Pokemon Collection Empty</h3>}
    </section>
  );
}