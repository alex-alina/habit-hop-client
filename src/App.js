import React from 'react';
import { Counter } from './features/counter/Counter';
import { Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
// import theme from './styles/theme';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Goals from './pages/Goals';
import Navigation from './components/Navigation';
import Div from './core-components/Div';

function App() {
  return (
    <>
      <Div my={3}>
        <Navigation />
        <Counter />
      </Div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}

export default App;
