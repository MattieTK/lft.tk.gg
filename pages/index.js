import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import useSWR from "swr";
import Fetcher from "../components/Fetcher";
import Notification from "react-web-notification";

export default function Home() {
  const [notifications, setNotifications] = useState(false);

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      ignore: true
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      ignore: true
    });
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>LFT notifications</title>
        <meta
          name="description"
          content="A minimal app to tell you when LFTs are available"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>LFT Notifications</h1>

        <p className={styles.description}>
          Accept notifications, leave the window open, and get a notification
          when tests are available again.
        </p>
        <Fetcher />
      </main>
    </div>
  );
}
