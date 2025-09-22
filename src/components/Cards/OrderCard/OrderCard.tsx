import * as Types from "@/modules/orders/types";

import dayjs from "dayjs";
import { useState } from "react";

import { Badge, Flex } from "@mantine/core";

import styles from "./OrderCard.module.scss";
import { Button } from "@/components/Button";

const OrderCard = ({
  data,
  mutation,
}: {
  data: Types.IEntity.MyOrders;
  mutation: (params: { id: number }) => void;
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteItem = (id: number) => {
    setDeletingId(id);
    mutation({ id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.top_content_wrapper}>
        <h3 className={styles.title}>Buyurtma ID: {data.id}</h3>
        {data.relatedRide !== null && !data.relatedRide.isCompleted && (
          <Badge color="teal" className={styles.badge}>
            FAOL
          </Badge>
        )}
      </div>
      <p>
        <strong>Yaratilgan:</strong>{" "}
        {`${dayjs(data.createdAt).format("YYYY-MM-DD")} - ${dayjs(
          data.createdAt
        ).format("HH:mm:ss")}`}
      </p>
      <p>
        <strong>Jo'nash sanasi:</strong>{" "}
        {`${dayjs(data.dateOfDeparture).format("YYYY-MM-DD")} - ${dayjs(
          data.dateOfDeparture
        ).format("HH:mm:ss")}`}
      </p>
      <p>
        <strong>Avto turi:</strong> {data.carType}
      </p>
      <p>
        <strong>Old o'rindiq:</strong>{" "}
        {data.frontSeat ? "Band qilingan" : "Band qilinmagan"}
      </p>
      <p>
        <strong>To'lov turi:</strong>{" "}
        {data.paymentType === "Cash" ? "Naqd pul" : "Kartadan"}
      </p>
      <p>
        <strong>Cashback miqdori:</strong> {data.cashbackUsed}
      </p>
      <p>
        <strong>Jo'nash manzili:</strong> {data.route.start.name}
      </p>
      <p>
        <strong>Borish manzili:</strong> {data.route.finish.name}
      </p>

      {data.relatedRide === null && (
        <p>
          <strong>Haydo‘vchi:</strong> {"Biriktirilmagan"}
        </p>
      )}

      {data.relatedRide !== null && (
        <div className={styles.driverSection}>
          <p>
            <strong>Haydo‘vchi:</strong> {data.relatedRide.driver.fullName}
          </p>
          <>
            <p>
              <strong>Mashina raqami:</strong>{" "}
              {data.relatedRide.driver.carNumber}
            </p>
            <p>
              <strong>Mashina turi:</strong>{" "}
              {data.relatedRide.driver.carModelName}
            </p>
            {data.ridePrice !== null && data.ridePrice !== "" && (
              <>
                <p>
                  <strong>Xizmat narxi:</strong> {data.ridePrice}
                </p>
                <p>
                  <strong>Keshbekdan:</strong> {data.cashbackUsed}
                </p>
                <p className={styles.price}>
                  <strong>To‘lov miqdori:</strong>{" "}
                  {+data.ridePrice - data.cashbackUsed}
                </p>
              </>
            )}
          </>
        </div>
      )}

      <Button
        full
        mt="lg"
        variant="danger"
        loading={deletingId === +data.id}
        disabled={deletingId === +data.id}
        onClick={() => handleDeleteItem(+data.id)}
      >
        Buyurtmani bekor qilish
      </Button>
    </div>
  );
};

export default OrderCard;
