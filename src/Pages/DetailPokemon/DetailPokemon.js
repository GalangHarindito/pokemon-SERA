import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import queryString from "querystring";
import "./style.css";
import { getPokemonId, resetMessage } from "./action";
import { useSelector } from "react-redux";

export default function DetailPokemon() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { pokemon } = queryString.parse(search.replace("?", ""));
  const { data, dataCatch, dataStatusStore } = useSelector(
    (s) => s.detailPokemon
  );
  const { message } = dataCatch;
  const empty = Object.keys(data).map((el) => el);
  const [confirmation, setConfirmation] = useState(false);
  const closeModal = () => setConfirmation(false);

  useEffect(() => {
    dispatch(getPokemonId(pokemon));
  }, []);

  useEffect(() => {
    if (!confirmation) {
      if (message) {
      }
      dispatch(resetMessage("", "Catch"));
    }
  }, [confirmation]);

  useEffect(() => {
    message ? setConfirmation(true) : closeModal();
  }, [message]);

  useEffect(() => {
    if (dataStatusStore === 200) {
      setConfirmation(false);
    }
  }, [dataStatusStore]);

  const abilities =
    empty.length < 1 ? "-" : data.abilities.map((el) => el.ability.name);
  const moves = empty.length < 1 ? "-" : data.moves.map((el) => el.move.name);
  const types = empty.length < 1 ? "-" : data.types.map((el) => el.type.name);

  return (
    <>
      {data && (
        <section className='detail-pokemon'>
          <div>
            <h3>{pokemon.toUpperCase()}</h3>
            <img
              src={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`}
              alt=''
            />
            <div>
              <p>
                <b>Abilities</b> :{" "}
                {typeof abilities === "object"
                  ? abilities.join(", ")
                  : abilities}
              </p>
              <p>
                <b>Move</b> :{" "}
                {typeof moves === "object" ? moves.join(", ") : moves}
              </p>
              <p>
                <b>Types</b> :{" "}
                {typeof types === "object" ? types.join(", ") : types}
              </p>
            </div>
          </div>
        </section>
      ) }
    </>
  );
}
