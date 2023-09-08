"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import HeaderBottom from "./components/Header/HeaderBottom";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Niggiwears",
  description: "AOG",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <html lang="en">
        <body>
          <Header />
          <HeaderBottom />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
      {/* </PersistGate> */}
    </Provider>
  );
}
