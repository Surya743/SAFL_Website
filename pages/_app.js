import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      <Component {...pageProps} />
    </>
  );
}
