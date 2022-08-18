import { Grommet, grommet } from 'grommet';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Grommet full theme={grommet}>
      <Component {...pageProps} />
    </Grommet>
    </>
    
  )
}

export default MyApp
