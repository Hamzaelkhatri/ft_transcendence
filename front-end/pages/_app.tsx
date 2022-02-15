import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  '../styles/Game.css';
import Canvas from './Game'

function MyApp({ Component, pageProps }: AppProps) {
  return <Canvas/>
}

export default MyApp
