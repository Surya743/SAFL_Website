import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
    <AuthProvider>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
