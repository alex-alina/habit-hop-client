import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Goals from './screens/Goals';
import LogIn from './screens/Login';
import Habits from './screens/Habits';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/goals" element={<Goals />} />
        <Route path="/habits/:goalId" element={<Habits />} />
      </Routes>
    </>
  );
}

export default App;
