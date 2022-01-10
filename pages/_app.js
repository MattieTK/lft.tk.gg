import "../styles/globals.css";
import { ThemeProvider } from "theme-ui";
import theme from "../theme";
import PlausibleProvider from "next-plausible";

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="lft.tk.gg"
      customDomain="https://stats.tk.gg"
      selfHosted={true}
      enabled={process.env.VERCEL_ENV == "production"}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
