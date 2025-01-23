import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import UseReducerPage from "./assets/pages/UseReducerPage";
import ContextAPIPage from "./assets/pages/ContextAPIPage";
import ChangeThemePage from "./assets/pages/ChangeThemePage";
import ModalPage from "./assets/pages/ModalPage";
import MemoPage from "./assets/pages/MemoPage";
import UseEffectPage from "./assets/pages/UseEffectPage";
import BookShelvesPage from "./assets/pages/BookShelves";

import "./App.css";

const projectBasePath = "/asac-react-practice"; // 기본 경로를 변수로 정의

function App() {
  return (
    <Router basename={projectBasePath}>
      <Routes>
        <Route path="/" element={<Home />} /> {/* 메인 페이지 */}
        <Route path="/useReducerPage" element={<UseReducerPage />} />
        <Route path="/ContextAPIPage" element={<ContextAPIPage />} />
        <Route path="/ChangeThemePage" element={<ChangeThemePage />} />
        <Route path="/ModalPage" element={<ModalPage />} />
        <Route path="/MemoPage" element={<MemoPage />} />
        <Route path="/UseEffectPage" element={<UseEffectPage />} />
        <Route path="/bookShelvesPage" element={<BookShelvesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
