import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="/math-code.js"
        type="text/javascript"
        strategy="beforeInteractive"
      />
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=es6"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
