import React from 'react';
// import { Counter } from './features/counter/Counter';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Goals from './screens/Goals';
import LogIn from './screens/Login';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}

export default App;
