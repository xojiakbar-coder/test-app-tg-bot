import { IconCheck } from '@tabler/icons-react';
import { Button } from '@/components/Button';
import { notifications } from '@mantine/notifications';

import styles from './Driver.module.scss';

import Form from './components/Form';
import CreateForm from '@/modules/driver/forms/Create';

const Create = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <CreateForm
          onSuccess={() => {
            notifications.show({
              color: 'teal',
              loading: false,
              autoClose: 2000,
              icon: <IconCheck />,
              position: 'top-center',
              title: "Tarifini yangilash uchun so'rov yuborildi !",
              message: null
            });
          }}
        >
          {({ isLoading }) => {
            return (
              <>
                <Form />
                <Button type="submit" variant="filled" h={46} disabled={isLoading} className={styles.submit_button}>
                  {isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
                </Button>
              </>
            );
          }}
        </CreateForm>
      </div>
    </div>
  );
};

export default Create;
