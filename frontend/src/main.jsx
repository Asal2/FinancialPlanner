// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import "./index.css";
// import App from

// // Replace this with your actual Clerk Frontend API Key
// const clerkFrontendApi = import.met;

// if (!clerkFrontendApi) {
//   throw new Error("Add your Clerk Publishable Key to the .env.local file");
// }

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     {/* <ClerkProvider frontendApi={clerkFrontendApi}> */}
//     <App />
//     {/* </ClerkProvider> */}
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log(PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
