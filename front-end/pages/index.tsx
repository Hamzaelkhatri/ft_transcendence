import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import Canvas from './Game'

const Home: NextPage = () => {
  const onClick = () =>
  {
    

  }
  return (
    <div>
      <button onClick={onClick} >Sign In </button>
    </div>
  );
}

export default Home
