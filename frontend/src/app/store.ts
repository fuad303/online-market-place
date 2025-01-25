import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authApi from "./api/authApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
import fileApi from "./api/uploadApi";
import notificationsApi from "./api/notificationsApi";
const rootReducer = combineReducers({
  authApi: authApi.reducer,
  user: userReducer,
  fileApi: fileApi.reducer,
  notificationsApi: notificationsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      fileApi.middleware,
      authApi.middleware,
      notificationsApi.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
