import useSWR from "swr";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { useState, useEffect } from "react";
import { Heading, Box, Button, Flex, Text, Link, Spinner } from "theme-ui";
import NotificationButton from "./NotificationButton";
import { usePlausible } from "next-plausible";
import useWindowFocus from "use-window-focus";

TimeAgo.addDefaultLocale(en);

const Fetcher = ({ mobileBrowser }) => {
  const plausible = usePlausible();

  const fetcher = async function (...args) {
    const data = await fetch(...args);
    const json = await data.json();
    return json;
  };
  const { data, error } = useSWR("/api/lftCheck", fetcher, {
    refreshInterval: 60000,
    refreshWhenHidden: true,
  });
  const windowFocused = useWindowFocus();

  const checkNotificationsPermission = () => {
    if (typeof window !== "undefined") {
      if (window.Notification) {
        if (window.Notification.permission === "granted") {
          return "granted";
        } else if (window.Notification.permission === "default") {
          return "default";
        } else if (window.Notification.permission === "denied") {
          return "denied";
        }
      }
    } else {
      return "not supported";
    }
  };
  const getNotifications = async () => {
    if (typeof window !== "undefined") {
      const state = await window.Notification.requestPermission();
      if (state === "granted") {
        setNotifications("granted");
      } else if (state === "denied") {
        setNotifications("denied");
      }
    }
  };
  const sendNotification = async () => {
    if (typeof window !== "undefined" && mobileBrowser() == false) {
      if (notificationSent == false && windowFocused == false) {
        const lftNotification = new window.Notification("LFTs are available", {
          body: "Click to open order page",
          requireInteraction: true,
          icon: "/lft-icon.jpg",
          image: "/lft-icon.jpg",
          badge: "/lft-icon.jpg",
        });
        lftNotification.onclick = function (event) {
          event.preventDefault();
          window.open(
            "https://test-for-coronavirus.service.gov.uk/order-lateral-flow-kits",
            "_blank"
          );
        };
        plausible("NotificationSent", {
          props: Date.now(),
        });
        setNotificationSent(true);
      }
    }
  };

  useEffect(() => {
    if (data?.status == "CLOSED") {
      setNotificationSent(false);
    }
    return () => {};
  }, [data]);

  const [notifications, setNotifications] = useState(
    checkNotificationsPermission()
  );
  const [notificationSent, setNotificationSent] = useState(false);

  if (error) {
    console.error(error);
    return (
      <Text>??? Error on loading checker. Refresh, or I might be broken.</Text>
    );
  } else if (!data) {
    return <Spinner />;
  } else {
    console.log(data);

    if (data.status === "CLOSED") {
      return (
        <Flex sx={{ flexDirection: "column", textAlign: "center" }}>
          {notifications == false ? (
            <Button
              sx={{ padding: [2, 3], margin: [2, 3], cursor: "pointer" }}
              onClick={() => getNotifications()}
            >
              Get notifications
            </Button>
          ) : (
            ""
          )}
          <NotificationButton
            notifications={notifications}
            getNotifications={getNotifications}
          />
          <Text as="h2">LFT orders are closed currently.</Text>
          <Text sx={{ paddingTop: [3, 4] }}>
            Last checked:{" "}
            <ReactTimeAgo
              style={{ fontStyle: "italic" }}
              date={data.timeChecked}
              locale="en-US"
            />
          </Text>
        </Flex>
      );
    } else if (data.status === "OPEN") {
      if (notifications == "granted") {
        sendNotification();
      }
      return (
        <Flex sx={{ flexDirection: "column", textAlign: "center" }}>
          <NotificationButton
            notifications={notifications}
            getNotifications={getNotifications}
          />
          <Heading as="h2">
            <Link href="https://test-for-coronavirus.service.gov.uk/order-lateral-flow-kits">
              LFT orders are open.
            </Link>
          </Heading>
          <Text style={{ paddingTop: [3, 4] }}>
            Last checked:{" "}
            <ReactTimeAgo
              date={data.timeChecked}
              style={{ fontStyle: "italic" }}
              locale="en-US"
            />
          </Text>
        </Flex>
      );
    } else if (data.status === "ERROR") {
      return (
        <Text>??? Error on loading checker. Refresh, or I might be broken.</Text>
      );
    } else {
      return <div></div>;
    }
  }
};

export default Fetcher;
