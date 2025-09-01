import { notifications } from '@mantine/notifications';

import * as Types from '../types';
import * as Icons from '@tabler/icons-react';

// styles
import cx from 'clsx';
import styles from '../../Notification.module.scss';

const warning = ({
  id,
  title,
  message,
  autoClose,
  position = 'top-center',
  withCloseButton = false,
  icon
}: Types.IUse.IProps) => {
  return notifications.show({
    id,
    title,
    message,
    autoClose,
    position,
    icon: <Icons.IconExclamationMark className={styles.notify_icon} />,
    withCloseButton,
    classNames: {
      title: styles.notify_title,
      icon: styles.notify_icon_wrapper,
      description: styles.notify_description,
      root: cx(styles.notify_root, styles.warning_root)
    }
  });
};

export default warning;
