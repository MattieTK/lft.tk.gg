import { Button, Text, Link } from "theme-ui";

const NotificationButton = ({ notifications, getNotifications }) => {
  if (notifications == "default") {
    return (
      <Button
        sx={{ padding: [2, 3], margin: [2, 3], cursor: "pointer" }}
        onClick={() => getNotifications()}
      >
        Get notifications
      </Button>
    );
  } else if (notifications == "denied") {
    return (
      <Text as="h3" sx={{ padding: [3, 4] }}>
        You have denied notifications. Please{" "}
        <Link href="https://blog.pushpad.xyz/2017/08/reset-browser-permission-for-web-push-notifications/">
          reset your browser permissions
        </Link>{" "}
        to request again.
      </Text>
    );
  } else if (notifications == "not supported") {
    return (
      <Text as="h3" sx={{ padding: [3, 4] }}>
        Notifications are not supported on this browser.
      </Text>
    );
  } else return null;
};

export default NotificationButton;
