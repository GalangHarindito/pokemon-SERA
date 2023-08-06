import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import { getAllPokemon } from "./action";
import { useSelector } from "react-redux";
import CardPokemon from "../../component/CardPokemon";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "querystring";
import { useHistory, useLocation } from "react-router";
import DetailPokemon from "../DetailPokemon";
import { Link } from "react-router-dom";
import Loaders from "../../component/loaders/Loaders";

export default function PokemonList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  let { offset } = queryString.parse(search.replace("?", ""));
  const { pokemon } = queryString.parse(search.replace("?", ""));
  const { dataResults, dataNext, dataCount, isLoading } =
    useSelector((s) => s.pokemonList);
  const [dataAll, setDataAll] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  let req = {
    limit: 20,
    offset: offset || 0,
  };

  useEffect(() => {
    dispatch(getAllPokemon(req));
  }, []);

  useEffect(() => {
    setDataAll(dataAll.concat(dataResults))
  }, [dataResults]);

  useEffect(() => {
    dispatch(getAllPokemon(req));
  }, [offset]);

  if (search.includes("?pokemon") && pokemon) {
    return <DetailPokemon />;
  }

  const nextData = () => {
    if (dataResults.length > 0) {
      req["offset"] = Number(req.offset) + 10;
    }
    if(!dataNext){
      setHasMore(false)
    }
    const newQuery = queryString.stringify(req);
    history.push(`?${newQuery}`);
  };

  return (
    <section className='pokemon-list'>
      <div>
        <h3>Let's Find Your Pokemon</h3>
        <Link to='/'>Home</Link>
        <br />
        <p>Total pokemon = {dataCount}</p>
        <div>
          <InfiniteScroll
            dataLength={dataAll.length}
            next={nextData}
            style={{ overflow: "hidden" }}
            hasMore={hasMore}
            loader={isLoading ? <Loaders use='global' /> : <p>More Pokemon</p>}
          >
            <CardPokemon
              data={dataAll}
              onClick={(id) => history.push(`?pokemon=${id}`)}
            />
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
}
