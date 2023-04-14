import { Route, Routes } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components";
import {
  Trending,
  Movies,
  TVSeries,
  Search,
  MediaDetail,
  NotFound,
} from "./Pages";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="main">
          <Routes>
            <Route element={<NotFound />} />
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TVSeries />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:media/:id" element={<MediaDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
