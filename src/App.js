import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { Helmet } from 'react-helmet';
import GlobalStyle from './styles/global-style';
import routes from './routes';

const AsyncPage = loadable((props) => import(`./pages${props.importPath}`), {
  cacheKey: (props) => props.importPath,
});

const App = () => {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle="BreakLine"
        titleTemplate="%s | BreakLine"
        meta={[{ charset: 'UTF-8' }, { name: 'robots', content: 'noindex' }]}
      />

      <Router>
        {/* <Home tableId="two" /> */}
        <Routes>
          {routes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<AsyncPage {...route} />}
            />
          ))}
        </Routes>
      </Router>

      <GlobalStyle />
    </>
  );
};

export default App;
