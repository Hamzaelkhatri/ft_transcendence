import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div>
      {/* <Head>
        <title>Ping Pong Game</title>
      </Head> */}

      <div className="wrapper">

        <div className="ping"> </div>
        <div className="ping"></div>
        <div className="ball "></div>
      </div>

      <div className="button" >
       
      </div>
    </div>


  )
}

