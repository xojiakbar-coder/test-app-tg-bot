import dayjs from 'dayjs';
import { useState } from 'react';

import styles from './OrderCard.module.scss';
import { Badge, Button, Flex } from '@mantine/core';

const OrderCard = ({ data, mutation }: { data: any; mutation: (params: { id: number }) => void }) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteItem = (id: number) => {
    setDeletingId(id);
    mutation({ id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.top_content_wrapper}>
        <h3 className={styles.title}>Buyurtma ID: {data.id}</h3>
        {data.relatedRide !== null && data.relatedRide.driver && (
          <Badge color="green" className={styles.badge}>
            Aktiv
          </Badge>
        )}
      </div>
      <p>
        <strong>Yaratilgan:</strong> {data.createdAt}
      </p>
      <p>
        <strong>Jo'nash sanasi:</strong>{' '}
        {`${dayjs(data.dateOfDeparture).format('YYYY-MM-DD')} - ${dayjs(data.dateOfDeparture).format('HH:mm:ss')}`}
      </p>
      <p>
        <strong>Avto turi:</strong> {data.carType}
      </p>
      <p>
        <strong>Old o'rindiq:</strong> {data.frontSeat ? 'Band qilingan' : 'Band qilinmagan'}
      </p>
      <p>
        <strong>To'lov turi:</strong> {data.paymentType === 'Cash' ? 'Naqd pul' : 'Kartadan'}
      </p>
      <p>
        <strong>Jo'nash manzili:</strong> {data.route.start.name}
      </p>
      <p>
        <strong>Borish manzili:</strong> {data.route.finish.name}
      </p>

      {data.relatedRide === null && (
        <p>
          <strong>Haydo‘vchi:</strong> {'Biriktirilmagan'}
        </p>
      )}

      {data.relatedRide !== null && (
        <div className={styles.driverSection}>
          <p>
            <strong>Haydo‘vchi:</strong> {data.relatedRide.driver.fullName}
          </p>
          <>
            <p>
              <strong>Mashina raqami:</strong> {data.relatedRide.driver.carNumber}
            </p>
            <p>
              <strong>Mashina turi:</strong> {data.relatedRide.driver.carModelName}
            </p>
            <p>
              <strong>Telefon raqami:</strong> {data.relatedRide.driver?.phoneNumber}
            </p>
          </>
        </div>
      )}
      <Flex justify="flex-end" gap={7}>
        {/* <Button
          h={42}
          mt="lg"
          size="sm"
          color="teal"
          w="max-content"
          loading={deletingId === +data.id}
          disabled={deletingId === +data.id}
          onClick={() => handleDeleteItem(+data.id)}
        >
          Haydo‘vchi bilan bog‘lanish
        </Button> */}

        <Button
          h={42}
          mt="lg"
          size="sm"
          color="red"
          w="max-content"
          loading={deletingId === +data.id}
          disabled={deletingId === +data.id}
          onClick={() => handleDeleteItem(+data.id)}
        >
          Buyurtmani bekor qilish
        </Button>
      </Flex>
    </div>
  );
};

export default OrderCard;
