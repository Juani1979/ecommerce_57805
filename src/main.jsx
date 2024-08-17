import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyDgRoOTXyJM_5gWS3XEnUPZOOBtT2P1ar0",
  authDomain: "drink-shop-dd70f.firebaseapp.com",
  projectId: "drink-shop-dd70f",
  storageBucket: "drink-shop-dd70f.appspot.com",
  messagingSenderId: "238606176153",
  appId: "1:238606176153:web:c83263e1f5eb124b878d08",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
