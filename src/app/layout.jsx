"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header/Navbar";
import HeaderBottom from "./components/Header/NavbarBottom";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });





export default function RootLayout({ children }) {
  return (
    <AuthProvider>
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
     </AuthProvider>
  );
}
