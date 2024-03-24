"use client";
import "../styles/globals.css";
import { Inter, Architects_Daughter } from "next/font/google";
import { store } from "../utilities/strore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-datetime/css/react-datetime.css";

import Modal from "react-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
});

export default function RootLayout({ children }) {
  Modal.setAppElement("#body");
  const pesistore = persistStore(store, {}, function () {
    pesistore.persist;
  });
  return (
    <html>
      <head>
        <title>Greendome Technologies</title>
      </head>
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}
        id="body"
      >
        <Provider store={store}>
          <PersistGate persistor={pesistore}>{children}</PersistGate>
        </Provider>
      </body>
    </html>
  );
}

export const metaData = {
  title: "Home",
  description: "My Updated Version",
};
