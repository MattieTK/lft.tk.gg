import useSWR from "swr";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useState } from "react";

TimeAgo.addDefaultLocale(en);

const Fetcher = () => {
  const fetcher = async function (...args) {
    const data = await fetch(...args);
    const json = await data.json();
    return json;
  };
  const { data, error } = useSWR("/api/lftCheck", fetcher, {
    refreshInterval: 30000,
    refreshWhenHidden: true,
  });
  const [notifications, setNotifications] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);
  const getNotifications = async () => {
    if (typeof window !== "undefined") {
      const state = await Notification.requestPermission();
      if (state === "granted") {
        setNotifications(true);
      }
    }
  };
  const sendNotification = async () => {
    if (typeof window !== "undefined") {
      if (notificationSent == false) {
        const lftNotification = new Notification({
          title: "LFTs are available",
          options: {
            body: "Click to open order page",
            requireAction: "true",
          },
        });
        lftNotification.onclick = function (event) {
          event.preventDefault();
          window.open(
            "https://test-for-coronavirus.service.gov.uk/order-lateral-flow-kits/condition",
            "_blank"
          );
        };
      }
    }
  };
  if (error) {
    console.error(error);
    return <div>Error on loading checker. Refresh, or I might be broken. </div>;
  } else if (!data) {
    return <div>Loading data... </div>;
  } else {
    if (data.status === "CLOSE") {
      return (
        <div>
          {notifications == false ? (
            <button onClick={() => getNotifications()}>
              Get notifications
            </button>
          ) : (
            ""
          )}
          <h3>LFT orders are closed currently.</h3>
          <p>
            Last checked:{" "}
            <ReactTimeAgo date={data.timeChecked} locale="en-US" />
          </p>
        </div>
      );
    } else if (data.status === "OPEN") {
      if (notifications == true) {
        sendNotification();
      }
      return (
        <div>
          {notifications == false ? (
            <button onClick={() => getNotifications()}>
              Get notifications
            </button>
          ) : (
            ""
          )}
          <h2>LFT orders are open.</h2>
          <p style={{ textAlign: "center" }}>
            Last checked:{" "}
            <ReactTimeAgo date={data.timeChecked} locale="en-US" />
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
};

export default Fetcher;
