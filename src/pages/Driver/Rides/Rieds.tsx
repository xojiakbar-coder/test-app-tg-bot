import { useEffect } from "react";
import { useDriver, useDelete } from "@/modules/driver/hooks";

import * as Cards from "@/components/Cards";
import { Title } from "@/components/Title";
import { Spinner } from "@/components/Spinner";
import { Placeholder } from "@/components/Placeholder";

// styles
import styles from "./Rides.module.scss";

const DriverRides = () => {
  const { mutate } = useDelete();
  const { driver, isLoading, isFetched } = useDriver();

  const activeRide = driver.recentRides?.find(
    (ride) => ride.isCompleted == false
  );

  useEffect(() => {
    driver.recentRides.find((item) => item.isCompleted === false);
  }, [driver]);

  if (isFetched && driver.recentRides.length === 0) {
    return (
      <Placeholder
        internalLink="/driver/new-order"
        title="Hozircha aktiv navbat yo‘q"
        buttonContent="Yangi buyurtma qo‘shish"
      />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.rides_wrapper}>
      <Title>Buyurtmalar ro'yxati</Title>

      <div className={styles.sections_wrapper}>
        {activeRide ? (
          <div className={styles.active_order_card}>
            <Cards.DriverRideCard data={activeRide} mutation={mutate} />
          </div>
        ) : (
          <div className={styles.no_active_ride}>
            <p>Sizda hozircha faol navbat yo‘q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRides;
