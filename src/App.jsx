import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Quiz from "./pages/Quiz";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />\
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
