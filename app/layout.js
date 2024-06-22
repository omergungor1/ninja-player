import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="">
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
          />

        </body>
      </html>
    </SessionWrapper>
  );
}