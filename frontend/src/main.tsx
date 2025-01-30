import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingState from "./components/LoadingState";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingState />} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
