import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from './pages/home/home';
import Layout from './compoments/layout/layout';
import Keyword from './pages/keyword/keyword';

const App = () => {
  return (
      <div>
        <h1>Hello, React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route  element={<Layout />}>
            <Route path="keyword" element={<Keyword />} />
          </Route>
        </Routes>
      </div>
  );
}
export default App;