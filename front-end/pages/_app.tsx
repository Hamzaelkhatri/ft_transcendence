import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
// import {fetch} from 


async function name(link:string) {


  //get data from api and return it
//   var myHeaders = new Headers();
console.log("here");
const res = await fetch("http://127.0.0.1:3000/auth/42/callback",
 {  method: 'GET',
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  return res
}


function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()
  const onClick = () =>
  {
    console.log(name('http://127.0.0.1:3000'))
  }
  return (
    <div>
      <button onClick={onClick} >Sign In </button>
    </div>
  );
}

export default MyApp
