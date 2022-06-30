import { configureStore, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from "redux-persist";
import cartReducer from "./reducers/cart";

export const persistCartConfig = {
  key: 'persistCart',
  storage,
  stateReconciler: hardSet,
}

const persistedCartReducer = persistReducer(persistCartConfig, cartReducer as Reducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
