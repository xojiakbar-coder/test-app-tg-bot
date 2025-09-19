import { useEffect } from "react";
import { useDriver, useDelete } from "@/modules/driver/hooks";

import * as Cards from "@/components/Cards";
import { Title } from "@/components/Title";
import { IconInbox } from "@tabler/icons-react";
import { Placeholder } from "@/components/Placeholder";

// styles
import styles from "./Rides.module.scss";

const DriverRides = () => {
  const { mutate, isPending } = useDelete();
  const { driver, isLoading } = useDriver();

  const activeRide = driver.recentRides?.find(
    (ride) => ride.isCompleted == false
  );

  useEffect(() => {
    driver.recentRides.find((item) => item.isCompleted === false);
  }, [driver]);

  if (!isLoading && !activeRide) {
    return (
      <Placeholder
        icon={IconInbox}
        internalLink="/"
        title="Hozircha aktiv navbat yo‘q"
        buttonContent="Yangi buyurtma qo‘shish"
      />
    );
  }

  return (
    <div className={styles.rides_wrapper}>
      <Title>Buyurtmalar ro'yxati</Title>

      <div className={styles.sections_wrapper}>
        {activeRide && (
          <div className={styles.active_order_card}>
            <Cards.DriverRideCard
              data={activeRide}
              mutation={mutate}
              isPending={isPending}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverRides;
