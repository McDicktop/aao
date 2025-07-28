import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateImages, updateGalleries } from "./features/gallerySlice";

import { fetchAllData } from "./utils/fetchAllData";

import AdminPanel from "./components/AdminPanel";
import Home from "./components/Home";
import CurrentGallery from "./components/CurrentGallery";
import Login from "./components/Login";




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {

      const { galleries, images } = await fetchAllData();

      dispatch(updateGalleries(galleries));
      dispatch(updateImages(images));
    };

    fetchData();
  }, []);




  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:id" element={<CurrentGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
