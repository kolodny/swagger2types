import React from 'react';
// import None from './none';
// import SwaggerTypescriptApi from './swagger-typescript-api';
// import Swagger2Types from './swagger2types';


const LazyNone = React.lazy(() => import('./none'));
const LazySwagger2Types = React.lazy(() => import('./swagger2types'));
const LazySwaggerTypescriptApi = React.lazy(
  () => import('./swagger-typescript-api')
);

function App() {
  return (
    <>
      <div>
        {/* <None />
        <Swagger2Types />
        <SwaggerTypescriptApi /> */}
        <React.Suspense fallback="Loading...">
          <LazyNone />
          <LazySwagger2Types />
          <LazySwaggerTypescriptApi />
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
