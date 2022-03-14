import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useEffect } from 'react';
import ResponsiveAppBar from "./Navbar"
// import TextCanvas from './canvas_text'
import HomePage from './home'
import Next_page from './First_pages'
import {MyProvider} from './ContextProvider'

// import leaderboard from './leaderboard'

function MyApp(props: AppProps) {

  const ISSERVER = typeof window === "undefined";




  const router = useRouter()
  // if (!ISSERVER) 
  {
    let popups;
    const [reactData, setReactData]: any = useState({});
    const [singIn, setSingIn] = useState("Sign In");
    const [popup, setPopup] = useState(false);

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
      const res = fetch("http://10.12.6.12:3000/user/me",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },

          //send token
          body: JSON.stringify({ token: router.query.token })
        })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setReactData(
            {
              email: data.email,
              usual_full_name: data.name,
              image_url: data.image,
              id: data.id
            })
          if (!ISSERVER) {
            localStorage.setItem("email", data.email)
            localStorage.setItem("usual_full_name", data.name)
            localStorage.setItem("image_url", data.image)
            localStorage.setItem("id", data.id)
            window.close();
          }
          setSingIn("Sign Out")
        })
    }
    const interval = setInterval(() => {

      if (popups !== undefined) {
        if (popups.closed) {
          if (!ISSERVER) {
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
      <MyProvider>
        {singIn === "Sign In" &&
          <HomePage />
        }

        {!popup && <ResponsiveAppBar data={reactData} usecase={singIn} login={login} />}
        {singIn === "Sign Out" &&
          <Next_page />
        }
      </MyProvider>
    );
  }
}

export default MyApp
