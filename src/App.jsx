import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import UseReducerPage from "./assets/pages/UseReducerPage";
import UseStatePage from "./assets/pages/UseStatePage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 메인 페이지 */}
        <Route path="/useReducerPage" element={<UseReducerPage />} />{" "}
        <Route path="/useStatePage" element={<UseStatePage />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
