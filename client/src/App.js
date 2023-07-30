import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth.js";
import Home from "./components/Home/Home";
import PostComments from "./components/Posts/PostComments";

const App = () => {
  // const [currentId, setCurrentId] = useState(0);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/comments/:postId" Component={PostComments} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
