import React from 'react';

const Suspensed = (Element) => function suspense(props) {
  return (
    <React.Suspense fallback={<div />}>
      <Element {...props} />
    </React.Suspense>
  );
};

export default {
  Home: Suspensed(React.lazy(() => import('./Home'))),
  PokemonList: Suspensed(React.lazy(() => import('./PokemonList'))),
  MyList: Suspensed(React.lazy(() => import('./MyList'))),
};