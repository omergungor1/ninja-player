"use client"

import { app } from '../shared/FirebaseConfig'
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore'

import Hero from "../components/Home/Hero";
import Search from "../components/Home/Search";
import GameList from "../components/Home/GameList";
import Posts from "../components/Home/Posts";
import { useEffect, useState } from "react";

export default function Home() {

  const db = getFirestore(app);

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPostData(postData => [...postData, doc.data()]);
    });

  }

  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9 mb-24">
      <Hero />
      <Search />
      <GameList />
      {postData ? <Posts postData={postData} /> : null}
    </div>
  );
}
