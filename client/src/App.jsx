import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateImages, updateGalleries, updatePosts } from "./features/gallerySlice";

import { fetchAllData } from "./utils/fetchAllData";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./components/AdminPanel";
import Home from "./components/Home";
import Layout from "./components/Layout";
import CurrentGallery from "./components/CurrentGallery";
import Login from "./components/Login";
import Contacts from "./components/Contacts";
import News from "./components/News";
import About from "./components/About";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchData = async () => {

      const { galleries, images, posts } = await fetchAllData();

      dispatch(updateGalleries(galleries));
      dispatch(updateImages(images));
      dispatch(updatePosts(posts));
    };

    fetchData();
  }, [dispatch]);


  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery/:id" element={<CurrentGallery />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
