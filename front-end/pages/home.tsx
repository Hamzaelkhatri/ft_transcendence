import * as React from 'react';
import TextCanvas from './canvas_text'
import Typewriter from 'typewriter-effect';



const HomePage = (prps: any) => {
  const ISSERVER = typeof window === "undefined";
  function wri_ter() {
    return (
      <div id="text">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Welcome to Online Ping Pong Game !')
              .pauseFor(2600)
              .callFunction(() => {
              })
              .start()
          }}
        />
      </div>
    );
  }
  // if(window.document.getElementById("cover") !== null)
  let img: number = 0;
  if (!ISSERVER) {
    let int = setInterval(() => {
      if (img === 0) {
        //check if element exists
        if (window.document.getElementById("cover") !== null) {
          window.document.getElementById("cover")!.src = "/images/cover-girl.png";
          img = 1;
        }
        else
          clearInterval(int);
      }
      else {
        if (window.document.getElementById("cover") !== null)
          window.document.getElementById("cover")!.src = "/images/cover-boy.png";
        img = 0;
      }
    }
      , 2000);
  }
  return (
    <>
      {
        wri_ter()
      }
      {/* {<TextCanvas />} */}
      <div >
        <img id="logo" src="/images/logo2.png" alt="logo" />
      </div>
      <img id="cover" src="/images/cover-girl.png" alt="row" />
    </>
  )
}

export default HomePage;