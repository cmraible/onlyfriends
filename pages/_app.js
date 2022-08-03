import { Grommet, grommet } from 'grommet';
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";


function MyApp({ Component, pageProps }) {
  usePageViews();
  return (
    <>
    <GoogleAnalytics />
    <Grommet full theme={grommet}>
      <Component {...pageProps} />
    </Grommet>
    </>
    
  )
}

export default MyApp
