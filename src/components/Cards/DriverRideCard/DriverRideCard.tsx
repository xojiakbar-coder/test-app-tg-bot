import { useState } from "react";
import * as Types from "@/modules/driver/types";

import { Badge, Flex } from "@mantine/core";
import { Button } from "@/components/Button";

import { useCompleteRide } from "@/modules/driver/hooks";

// styles
import cx from "clsx";
import styles from "./DriverRideCard.module.scss";
import dayjs from "dayjs";

const DriverRideCard = ({
  data,
  mutation,
  isPending,
}: {
  isPending?: boolean;
  data: Types.IEntity.RecentRide;
  mutation?: (params: { rideId: number }) => void;
}) => {
  const { mutate } = useCompleteRide();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteItem = (id: number) => {
    setDeletingId(id);
    if (mutation) mutation({ rideId: id });
  };

  return (
    <div className={cx(styles.card, data.isCompleted && styles.completed)}>
      <div className={styles.top_content_wrapper}>
        <h3 className={styles.title}>Buyurtma ID: {data.id}</h3>
        {data !== null && data.driver && (
          <Badge
            color={data.isCompleted ? "orange" : "teal"}
            className={styles.badge}
          >
            {data.isCompleted ? "Bajarilgan" : "Faol"}
          </Badge>
        )}
      </div>
      <p>
        <strong>Jo‘nash manzili:</strong> {data.route.start.name}
      </p>
      <p>
        <strong>Borish manzili:</strong> {data.route.finish.name}
      </p>

      <p>
        <strong>Yaratilgan:</strong> {data.createdAt}
      </p>
      {data.bookings.length ? (
        <p>
          <strong>Yo‘lovchilar soni:</strong> {`${data.bookings.length}ta`}
        </p>
      ) : null}

      {data.bookings.length > 0 &&
        data.bookings.map((item: Types.IEntity.Bookings) => {
          return (
            <div className={styles.driverSection} key={item.id}>
              <p>
                <strong>Yo‘lovchi:</strong> {item.passenger.fullName}
              </p>
              <p>
                <strong>Qo‘shimcha yuk:</strong> {item.extraLuggage || "Yo'q"}
              </p>
              <p>
                <strong>Old o'rindiq:</strong>{" "}
                {item.frontSeat ? "Band qilingan" : "Band qilinmagan"}
              </p>
              <p>
                <strong>Jo'nash sanasi:</strong>{" "}
                {`${dayjs(item.dateOfDeparture).format("YYYY-MM-DD")} - ${dayjs(
                  item.dateOfDeparture
                ).format("HH:mm:ss")}`}
              </p>
              <p>
                <strong>Telefon raqami:</strong> {item.passenger.phoneNumber}
              </p>
              <p>
                <strong>To‘lo‘v turi:</strong>{" "}
                {item.paymentType === "Cash" ? "Naqd pul" : "Kartadan"}
              </p>

              {item.ridePrice !== null && item.ridePrice !== "" && (
                <>
                  <p>
                    <strong>Xizmat narxi:</strong> {item.ridePrice}
                  </p>
                  {item.cashbackUsed && (
                    <p>
                      <strong>Keshbekdan:</strong> {item.cashbackUsed}
                    </p>
                  )}
                  <p className={styles.price}>
                    <strong>To‘lo‘v miqdori:</strong>{" "}
                    {+item.ridePrice - item.cashbackUsed}
                  </p>
                </>
              )}
            </div>
          );
        })}

      <Flex align="center" mt="md" justify="space-between" gap={8}>
        {!data.isCompleted && (
          <Button
            variant="danger"
            loading={deletingId === +data.id}
            disabled={deletingId === +data.id}
            onClick={() => handleDeleteItem(+data.id)}
            full={data.bookings.length < 0 ? false : true}
          >
            Bekor qilish
          </Button>
        )}
        {data.bookings.length > 0 && !data.isCompleted ? (
          <Button
            variant="success"
            loading={isPending}
            disabled={isPending}
            full={!data.isCompleted}
            onClick={() => mutate()}
          >
            Safarni yakunlash
          </Button>
        ) : null}
      </Flex>
    </div>
  );
};

export default DriverRideCard;
