"use client";

import React, { useEffect } from "react";
import { Airport, Book, Intro, Services } from "../modules/Home";
import { axiosInstance } from "../utils";
import { CookiesProvider } from "react-cookie";
import Livechatscript from "./livechatscript"
const Home = () => {
  const getSessionId = async () => {
    try {
      await axiosInstance.get(`booking2.php`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSessionId();
  }, []);
  return (
    <CookiesProvider>
      <Intro />
      <Book />
      <Services />
      <Airport />
      <Livechatscript/>
    </CookiesProvider>
  );
};

export default Home;
