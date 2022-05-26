import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen box-border flex flex-col items-center p-[40px] bg-gradient-to-r from-[#85A1BA] to-[#194591]">
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}

export default MyApp;