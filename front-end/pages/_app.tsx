import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { request } from 'https';
import { setRequestMeta } from 'next/dist/server/request-meta';
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useEffect } from 'react';

type user =
  {
    id: number,
    email: string// helkhatr@student.1337.ma,
    login: string// helkhatr,
    first_name: string// Hamza,
    last_name: string// Elkhatri,
    usual_full_name: string// Hamza Elkhatri,
    usual_first_name: any,
    url: string,
    phone: string,
    displayname: string
    image_url: string,
  }


// export const getStaticProps: GetStaticProps = async (context) => {

// }

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      message: "hello"
    }
  }
}


function MyApp(props: AppProps) {
  const router = useRouter()


  // const res = await axios.get("https://api.intra.42.fr/v2/me",
  // {
  //   headers: {
  //     'Authorization': 'Bearer ' + context.query.token,
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const data = async () => {
  //   const router = useRouter()
  //   if (router.query.token !== undefined) {

  //     const user[] = res.data

  //   }
  // }
  const [reactData, setReactData] = useState({});
  const [singIn, setSingIn] = useState("Sign In");

  const login = async (link: string) => {
    if (singIn === "Sign In") {
      router.push(link)
    }
    else {
      localStorage.clear();
      router.push("/")
    }

    singIn === "Sign In" ? setSingIn("Sign Out") : setSingIn("Sign In");

  }
  const ISSERVER = typeof window === "undefined";

  // useEffect(() => {
  if (singIn === "Sign In" && router.query.token !== undefined) {
    // fetch one time only
    const res = fetch("https://api.intra.42.fr/v2/me",
      {
        headers: {
          'Authorization': 'Bearer ' + router.query.token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setReactData(data)
        setReactData(
          {
            email: data.email,
            usual_full_name: data.usual_full_name,
            image_url: data.image_url
          })
        if (!ISSERVER) {

          localStorage.setItem("email", data.email)
          localStorage.setItem("usual_full_name", data.usual_full_name)
          localStorage.setItem("image_url", data.image_url)
        }
        setSingIn("Sign Out")
      })

    console.log(res)
    console.log(reactData)
    if(!ISSERVER && reactData.email !== undefined)
    {
      setSingIn("Sign Out")
      localStorage.setItem("email", reactData.email)
      localStorage.setItem("usual_full_name", reactData.usual_full_name)
      localStorage.setItem("image_url", reactData.image_url)
    }
    // useEffect(() => {

  }
  // if(!ISSERVER) {
  useEffect(() => {
    setReactData(
      {
        email: localStorage.getItem("email") === null ? "" : localStorage.getItem("email"),
        usual_full_name: localStorage.getItem("usual_full_name") === null ? "" : localStorage.getItem("usual_full_name"),
        image_url: localStorage.getItem("image_url") === null ? "" : localStorage.getItem("image_url")
      });
    // setSingIn("Sign Out")

    console.log(reactData)
    // }
  }, [])

  // useEffect(() => {

  // }, [])
  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar-left">
          <div className="nav-bar-left-menu">
            <div className="nav-bar-left-menu-item">
              <a href="/">Home</a>
            </div>
            <div className="nav-bar-left-menu-item">
              <a href="/about">About</a>
            </div>
            <div className="nav-bar-left-menu-item">
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="nav-bar-right">
          <div className="nav-bar-right-user">
              <img className="nav-bar-right-user-image" src={reactData.image_url} alt="user" />
            <div className="nav-bar-right-user-name">
              {reactData.usual_full_name}
            </div>
          </div>
          <div className="nav-bar-right-sign-in">
            <a href="/" onClick={() => login("/signin")}>{singIn}</a>
          </div>
        </div>
      </div>
    <div>
      {
        // reactData.map((user: user) => {
        // return (
        <div className="profile">
          <h1>{reactData.displayname}</h1>
          <img className="ImageProfile" src={reactData.image_url} alt="" />
          <div>
            <p>{reactData.login}</p>
            <p>{reactData.usual_full_name}</p>
          </div>
          <button className="Login_btn" onClick={() => login("http://127.0.0.1:3000/login/42/return")} >{singIn} </button>
        </div>
        // )
        // })
      }
    </div>
    </>
  );
}

export default MyApp
