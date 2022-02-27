import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useEffect } from 'react';
import ResponsiveAppBar from "./Navbar"
import TextCanvas from './canvas_text'
import HomePage from './home'
import Next_page from './First_pages'

function MyApp(props: AppProps) {
  let popups;
  const router = useRouter()
  const [reactData, setReactData]: any = useState({});
  const [singIn, setSingIn] = useState("Sign In");
  const ISSERVER = typeof window === "undefined";


  
  if (!ISSERVER) {

    const login = (link: string) => {
      if (singIn === "Sign In") {
        popups = window.open(link, 'popup', 'width=600,height=600');
      }
      else {
        localStorage.clear();
        router.push("/");
      }
      if (singIn === "Sign Out") {
        setReactData({
          //clear local storage
          usual_full_name: "",
          displayname: "",
          image_url: ""
        });
      }
    }

    if (singIn === "Sign In" && router.query.token !== undefined) {
      const res = fetch("https://api.intra.42.fr/v2/me",
        {
          headers: {
            'Authorization': 'Bearer ' + router.query.token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          setReactData(
            {
              email: data.email,
              usual_full_name: data.usual_full_name,
              image_url: data.image_url
            })
          localStorage.setItem("email", data.email)
          localStorage.setItem("usual_full_name", data.usual_full_name)
          localStorage.setItem("image_url", data.image_url)
          setSingIn("Sign Out")
          window.close();
        })
    }

    const [popup, setPopup] = useState(false);

    const interval = setInterval(() => {

      if (popups !== undefined) {
        if (popups.closed) {
          setReactData(
            {
              email: localStorage.getItem("email") === undefined ? "" : localStorage.getItem("email"),
              usual_full_name: localStorage.getItem("usual_full_name") === undefined ? "" : localStorage.getItem("usual_full_name"),
              image_url: localStorage.getItem("image_url") === undefined ? "" : localStorage.getItem("image_url")
            });
          clearInterval(interval);
          setPopup(false);
          setSingIn("Sign Out");
        }
      }

    }, 100);
    
    useEffect(() => {

      setReactData(
        {
          email: localStorage.getItem("email") === undefined ? "" : localStorage.getItem("email"),
          usual_full_name: localStorage.getItem("usual_full_name") === undefined ? "" : localStorage.getItem("usual_full_name"),
          image_url: localStorage.getItem("image_url") === undefined ? "" : localStorage.getItem("image_url")
        });

      if (localStorage.getItem("email") !== null) {
        setSingIn("Sign Out")
      }

    }, [])


    return (
      <>
        {singIn === "Sign In" &&
          <HomePage/>
          }
     
        {!popup && <ResponsiveAppBar data={reactData} usecase={singIn} login={login} />}
        {singIn === "Sign Out" && <Next_page/> }
      </>
    );
  }
  return (
    <>
      {/* <HomePage/> */}
    </>);
}

export default MyApp
