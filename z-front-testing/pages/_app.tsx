import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/Home.module.css'


function MyApp({ Component, pageProps }: AppProps) {
  
  
return (
    <>
    <div>
      <div className="wrapper">

        <div className="ping"> </div>
        <div className="ping"></div>
        <div className="ball "></div>
      </div>

      <div className="button" >
       
      </div>
    </div>
    </>
);
}

export default MyApp
