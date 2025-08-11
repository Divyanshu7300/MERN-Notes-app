import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./page/Homepage";
import CreatePage from "./page/CreatePage";
import NoteDetailPage from "./page/NoteDetailPage";
import {toast} from "react-hot-toast";
import Navbar from "./components/Navbar";
const App=()=>{
  return (
    <div >
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
