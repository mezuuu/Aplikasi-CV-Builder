import { BrowserRouter, Routes, Route } from "react-router-dom";
import CVBuilder from "./mahasiswa/CVBuilder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CVBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
