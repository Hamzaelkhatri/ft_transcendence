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
import {textcanvas} from './canvas_text'
// type user =
//   {
//     id: number,
//     email: string// helkhatr@student.1337.ma,
//     login: string// helkhatr,
//     first_name: string// Hamza,
//     last_name: string// Elkhatri,
//     usual_full_name: string// Hamza Elkhatri,
//     usual_first_name: any,
//     url: string,
//     phone: string,
//     displayname: string
//     image_url: string,
//   }



function MyApp(props: AppProps) {
  let popups;
  const router = useRouter()
  const [reactData, setReactData]:any = useState({});
  const [singIn, setSingIn] = useState("Sign In");
  const ISSERVER = typeof window   === "undefined";

  if(!ISSERVER)
  {

    const login = (link: string) => {
    if (singIn === "Sign In") {
        popups = window.open(link, 'popup', 'width=600,height=600');
    }
    else {
      localStorage.clear();
      router.push("/");
    }

    singIn === "Sign In" ? setSingIn("Sign Out") : setSingIn("Sign In");
    if(singIn === "Sign Out"){
      setReactData({
        //clear local storage
          usual_full_name: "",
          displayname: "",
          image_url: ""
      });
    }

  }

  if (singIn === "Sign In" && router.query.token !== undefined && window.opener !== window.self) {
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
          window.close();
          setSingIn("Sign Out")
      })

    // if (!ISSERVER && reactData.email !== undefined) 
    // {
    //   setSingIn("Sign Out")
    //   localStorage.setItem("email", reactData.email)
    //   localStorage.setItem("usual_full_name", reactData.usual_full_name)
    //   localStorage.setItem("image_url", reactData.image_url)
    // }
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
    }
  }
}, 100);

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

}, [])

return (
  <textcanvas/>
  // <>
  //   {popup&&<ResponsiveAppBar data={reactData} usecase={singIn==="Sing Out"} />}
  //   {
  //     <div >
  //       <img id="logo" src="/images/logo2.png" alt="logo" />
  //     </div>
  //   }
  //   <div id="row">
  //   <div>
  //     {singIn==="Sing Out" &&
  //       <div className="profile">
  //         <h1 id="displayname">{reactData.displayname}</h1>
  //         <img className="ImageProfile" id="img_profile" src={reactData.image_url} alt="" />
  //         <div>
  //           <p id="full_name">{reactData.usual_full_name}</p>
  //         </div>
  //         <button className="Login_btn" onClick={() => login("http://127.0.0.1:3000/login/42/return")} >{singIn} </button>
  //       </div>
  //     }
  //   </div>
  //   {
  //     popup && <div className="popup">
  //     <div className="popup-inner">
  //       <div className="popup-inner-header">
  //         <h1>Welcome</h1>
  //       </div>
  //       <div className="popup-inner-body">
  //         <h1>waiting for redirection</h1>
  //       </div>
  //     </div>
  //   </div>
  //   }
  //   </div>
  // </>
);
}
return(
  <>
  server side
  </>);
}

export default MyApp
