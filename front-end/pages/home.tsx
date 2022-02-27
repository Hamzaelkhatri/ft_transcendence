import * as React from 'react';
import TextCanvas from './canvas_text'
import Typewriter from 'typewriter-effect';



const HomePage = (prps: any)  =>
{
    let img: number = 0;
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
    if(window.document.getElementById("cover") !== null)
    {
    setInterval(() => {
        if (img === 0) 
        {
          window.document.getElementById("cover").src = "/images/cover-girl.png";
          img = 1;
        }
        else 
        {
          window.document.getElementById("cover").src = "/images/cover-boy.png";
          img = 0;
        }
      }, 2000);
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