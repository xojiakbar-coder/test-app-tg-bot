import { notifications } from "@mantine/notifications";

import * as Types from "../types";
import * as Icons from "@tabler/icons-react";

import cx from "clsx";
import styles from "../../Notification.module.scss";

const success = ({
  id,
  title,
  message,
  autoClose,
  position = "top-center",
  withCloseButton = false,
}: Types.IUse.IProps) => {
  return notifications.show({
    id,
    title,
    message,
    position,
    autoClose,
    icon: <Icons.IconCheck className={styles.notify_icon} />,
    withCloseButton,
    classNames: {
      title: styles.notify_title,
      icon: styles.notify_icon_wrapper,
      description: styles.notify_description,
      root: cx(styles.notify_root, styles.success_root),
    },
  });
};

export default success;
