import { useDriver } from "@/modules/driver/hooks";
import * as Icons from "@tabler/icons-react";
import Title from "@/components/Title/Title";
import DriverRideCard from "@/components/Cards/DriverRideCard/DriverRideCard";

import styles from "./Archive.module.scss";

const Archive = () => {
  const { driver } = useDriver();

  const completedRides = driver.recentRides?.filter((ride) => ride.isCompleted);

  return (
    <div className={styles.container}>
      <Title>Arxiv safarlar ro'yxati</Title>
      <div className={styles.completed_orders_content}>
        {completedRides?.length > 0 ? (
          completedRides.map((item) => (
            <>
              <DriverRideCard key={item.id} data={item} />
              <DriverRideCard key={item.id} data={item} />
              <DriverRideCard key={item.id} data={item} />
              <DriverRideCard key={item.id} data={item} />
              <DriverRideCard key={item.id} data={item} />
              <DriverRideCard key={item.id} data={item} />
            </>
          ))
        ) : (
          <div className={styles.empty_icon_wrapper}>
            <Icons.IconInbox className={styles.empty_icon} />
            <p className={styles.empty_subtitle}>Bajarilgan buyurtmalar yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
