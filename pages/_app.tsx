import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { persistCartConfig, store } from "../store";
import crossBrowserListener from '../helper/crossBrowserListener';

let persistor = persistStore(store);

if (typeof window !== "undefined") {
  // redux-persist : https://daverivera90.medium.com/sharing-state-between-browser-tabs-with-redux-68899eb88fb7
  window.addEventListener('storage', crossBrowserListener(store, persistCartConfig));
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  )
}

export default MyApp
