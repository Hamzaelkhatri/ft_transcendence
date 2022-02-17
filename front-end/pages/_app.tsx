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
  const login = async (link: string) => {
    router.push(link)
  }

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

  // useEffect(() => {
    if (router.query.token !== undefined && localStorage.getItem("token") === null) 
    {
     const res =  fetch("https://api.intra.42.fr/v2/me",
     {
       headers: {
         'Authorization': 'Bearer ' +router.query.token,
         'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setReactData(data)
      }).catch((e) => { console.log(e) });
      console.log(res)
      console.log(reactData)
    }

    const ISSERVER = typeof window === "undefined";

// if() {
//  // Access localStorage

    
    if(!ISSERVER &&localStorage.getItem("token") !== null) 
    {
      reactData.email = localStorage.getItem("email")
      reactData.login = localStorage.getItem("login")
      reactData.first_name = localStorage.getItem("first_name")
    }
    if(reactData.email !== undefined)
    {
      localStorage.setItem("token", router.query.token+"")
      localStorage.setItem("email", reactData.email)
      localStorage.setItem("image", reactData.login)
      localStorage.setItem("first_name", reactData.usual_full_name)
    }


  return (
    <div>
      {
        
      }
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
            </div>
          // )
        // })
      }
      <button onClick={() => login("http://127.0.0.1:3000/login/42/return")} >Sign In </button>
    </div>
  );
}

export default MyApp
