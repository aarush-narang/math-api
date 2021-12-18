import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import { HomePage } from './pages/home'

function App() {
  return (
    <Routes>
      <Route caseSensitive={true} path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
