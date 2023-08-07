import React from 'react';

const Suspensed = (Element) => function suspense(props) {
  return (
    <React.Suspense fallback={<div />}>
      <Element {...props} />
    </React.Suspense>
  );
};

const page = {
  Home: Suspensed(React.lazy(() => import('./Home'))),
  PokemonList: Suspensed(React.lazy(() => import('./PokemonList'))),
}

export default page;