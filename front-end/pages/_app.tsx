import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { request } from 'https';
import { setRequestMeta } from 'next/dist/server/request-meta';

class User {
  fullName: string;
  email: string;
  image: string;

  constructor(fullName: string, email: string, image: string) {
    this.fullName = fullName;
    this.email = email;
    this.image = image;
  }

  //getters and setters
  get _fullName() {
    return this.fullName;
  }

  set _fullName(value: string) {
    this.fullName = value;
  }

  get _email() { return this.email; }

  set _email(value: string) {
    this.email = value;
  }

  get _image() { return this.image; }

  set _image(value: string) {
    this.image = value;
  }


  ToJson() {
    return ({
      fullName: this.fullName,
      email: this.email,
      image: this.image
    });
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const login = async (link: string) => {
    // router.push(link)
    console.log({
      username: user._fullName,
      email: user._email,
      image: user._image
      
    })
  }

  let user = new User("T", "T", "T")

  const info = async () => {
    if (router.query.token !== undefined) {
      const res = await axios.get("https://api.intra.42.fr/v2/me",
        {
          headers: {
            'Authorization': 'Bearer ' + router.query.token,
          }
        });
      console.log(res.data)
      //new User(res.data.displayname, res.data.email, res.data.new_image_url)
      user._fullName = res.data.displayname;
      user._email = res.data.email;
      user._image = res.data.new_image_url;
      return (res.data);
    }
  }
  const t = info()
  
  return (
    <div>
      <button onClick={() => login("http://127.0.0.1:3000/auth/42/callback")} >Sign In </button>
    </div>
  );
}

export default MyApp
