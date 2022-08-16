import { Grommet, grommet } from 'grommet';


function MyApp({ Component, pageProps }) {
  usePageViews();
  return (
    <>
    <Grommet full theme={grommet}>
      <Component {...pageProps} />
    </Grommet>
    </>
    
  )
}

export default MyApp
