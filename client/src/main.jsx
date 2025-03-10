import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Ensure this file exists
import "./index.css";         // Ensure this file exists
import  { persistor, store } from "./redux/store";  // Ensure Redux store exists
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);


