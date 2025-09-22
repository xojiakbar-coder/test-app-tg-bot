import { notifications } from '@mantine/notifications';
import * as Icons from '@tabler/icons-react';
import cx from 'clsx';

import * as Types from '../types';
import styles from '../../Notification.module.scss';

// overload
function info(message: Types.IUse.SingleProps): string;
function info(props: Types.IUse.INotification): string;

function info(arg: Types.IUse.SingleProps | Types.IUse.INotification) {
  const values: Types.IUse.INotification = typeof arg === 'string' ? { message: arg } : arg;

  return notifications.show({
    id: values.id,
    title: values.title,
    message: values.message,
    position: values.position || 'top-center',
    autoClose: values.autoClose || 2000,
    icon: <Icons.IconExclamationMark className={styles.notify_icon} />,
    withCloseButton: values.withCloseButton ?? false,
    classNames: {
      title: styles.notify_title,
      icon: styles.notify_icon_wrapper,
      description: styles.notify_description,
      root: cx(styles.notify_root, styles.info_root)
    }
  });
}

export default info;
