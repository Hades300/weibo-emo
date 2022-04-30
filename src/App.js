import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from './pages/home/home';
import Layout from './compoments/layout/layout';
import Keyword from './pages/keyword/keyword';
import Keyview from './pages/keyview/keyview';
import Task from './pages/task/task';

const App = () => {
  return (
      <div>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route  element={<Layout />}>
            <Route path="keyword" element={<Keyword />} />
            <Route path="keyword/:keyword" element={<Keyview />} />
            <Route path="task" element={<Task />} />
          </Route>
        </Routes>
      </div>
  );
}
export default App;