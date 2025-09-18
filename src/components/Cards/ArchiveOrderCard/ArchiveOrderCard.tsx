import * as Types from "@/modules/orders/types";

import dayjs from "dayjs";

import cx from "clsx";
import styles from "./ArchiveOrderCard.module.scss";

const ArchiveOrderCard = ({ data }: { data: Types.IEntity.MyOrders }) => {
  return (
    <div
      className={cx(
        styles.card,
        data?.relatedRide?.isCompleted && styles.completed
      )}
    >
      <div className={styles.top_content_wrapper}>
        <h3 className={styles.title}>Buyurtma ID: {data.id}</h3>
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
            <p>
              <strong>Telefon raqami:</strong>{" "}
              {data.relatedRide.driver?.phoneNumber}
            </p>
          </>
        </div>
      )}
    </div>
  );
};

export default ArchiveOrderCard;
