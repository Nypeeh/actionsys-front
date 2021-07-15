import type { AppProps } from 'next/app'

import { AppProvider } from '../hooks'
import GlobalStyle from '../styles/Global'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyle />
    </AppProvider>
  )
}

export default MyApp
