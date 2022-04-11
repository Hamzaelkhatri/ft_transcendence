import "../styles/index.scss"
import { MyProvider } from "../components/ContextProvider"
function MyApp({ Component, pageProps }) {
  return (
    <MyProvider>
      <Component {...pageProps} />
    </MyProvider>
  )
}

export default MyApp