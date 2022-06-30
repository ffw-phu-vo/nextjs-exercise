import { getStoredState, REHYDRATE } from 'redux-persist'

const crossBrowserListener = (store:any, persistConfig:any) => {
  return async () => {
    let state = await getStoredState(persistConfig)

    store.dispatch({
      type: REHYDRATE,
      key: persistConfig.key,
      payload: state,
    })
  }
}

export default crossBrowserListener;
