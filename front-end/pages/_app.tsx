import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
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
var popup;


function MyApp(props: AppProps) {
  const router = useRouter()
  const [reactData, setReactData] = useState({});
  const [singIn, setSingIn] = useState("Sign In");
  const ISSERVER = typeof window === "undefined";

  const login = async (link: string) => {
    if (singIn === "Sign In") {
      // router.push(link)
      if (!ISSERVER) {
        popup = window.open(link, 'popup', 'width=600,height=600');
        popup.focus();
        // console.log(popup);

      }
    }
    else {
      localStorage.clear();
      router.push("/");
    }

    singIn === "Sign In" ? setSingIn("Sign Out") : setSingIn("Sign In");

  }

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
          // window.document.getElementsByClassName("profile").innerHTML = "Waiting for redirect...";
          localStorage.setItem("email", data.email)
          localStorage.setItem("usual_full_name", data.usual_full_name)
          localStorage.setItem("image_url", data.image_url)
          window.opener.document.getElementById('full_name').innerHTML = data.usual_full_name;
          window.opener.document.getElementById('img_profile').src = data.image_url;
          window.opener.document.getElementById('image_url').src = data.image_url;
          window.close();
          
          // window.opener.reload(1);
          // window.opener.document.getElementById('image_url').innerHTML = data.usual_full_name;
        }
        setSingIn("Sign Out")
        // set data in parent window

        // window.close();

      })

    // console.log(res)
    // console.log(reactData)
    if (!ISSERVER && reactData.email !== undefined) 
    {
      setSingIn("Sign Out")
      localStorage.setItem("email", reactData.email)
      localStorage.setItem("usual_full_name", reactData.usual_full_name)
      localStorage.setItem("image_url", reactData.image_url)
    }
  }

  const [popup, setPopup] = useState(false);

// if(!ISSERVER) {
useEffect(() => {


  if(window.opener !== null) 
  {
    setPopup(true);
  }
  
  setReactData(
    {
      email: localStorage.getItem("email") === undefined ? "" : localStorage.getItem("email"),
      usual_full_name: localStorage.getItem("usual_full_name") === undefined ? "" : localStorage.getItem("usual_full_name"),
      image_url: localStorage.getItem("image_url") === undefined ? "" : localStorage.getItem("image_url")
    });

  if (localStorage.getItem("email") !== null) {
    setSingIn("Sign Out")
  }

  console.log(reactData)
  // requestAnimationFrame(() => fetchin());
  // }
}, [])




// useEffect(() => {
const Home = () => {

  if (!ISSERVER) {
    router.push("/login");
  }
}
// }, [])
return (
  <>
    
    {!popup&& <div className="nav-bar">
       
      <div className="nav-bar-left">
        <div className="nav-bar-left-menu">
          <div onClick={Home} className="nav-bar-left-menu-item">
            <a id="retrievedData">Home</a>
          </div>
        </div>
      </div>
      <div className="nav-bar-right">
        <div className="nav-bar-right-user">
          <img className="nav-bar-right-user-image" id="image_url" src={reactData.image_url} alt="user" />
          <div className="nav-bar-right-user-name">
            {reactData.usual_full_name}
          </div>
        </div>
        <div onClick={() => login("http://127.0.0.1:3000/auth/42/callback")} className="nav-bar-right-sign-in">
          <a >{singIn}</a>
        </div>
      </div>

    </div>
      }
    <div>
      {!popup &&
        // reactData.map((user: user) => {
        // return (
        <div className="profile">
          <h1 id="displayname">{reactData.displayname}</h1>
          <img className="ImageProfile" id="img_profile" src={reactData.image_url} alt="" />
          <div>
            <p id="full_name">{reactData.usual_full_name}</p>
          </div>
          <button className="Login_btn" onClick={() => login("http://127.0.0.1:3000/auth/42/callback")} >{singIn} </button>
        </div>
        // )
        // })
      }
    </div>
    {
      popup && <div className="popup">
      <div className="popup-inner">
        <div className="popup-inner-header">
          <h1>Welcome</h1>
        </div>
        <div className="popup-inner-body">
          <h1>waiting for redirection</h1>
        </div>
      </div>
    </div>
    }
  </>
);
}

export default MyApp
