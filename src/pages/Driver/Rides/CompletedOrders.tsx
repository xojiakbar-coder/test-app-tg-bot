import { useDriver } from "@/modules/driver/hooks";
import styles from "./MyOrders.module.scss";

import { Title } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";
import DriverRideCard from "@/components/Card/DriverRideCard/DriverRideCard";
import SpinnerLoader from "@/components/Loader/Spinner";

const CompletedOrders = () => {
  const { driver, isFetched, isLoading } = useDriver();

  const completedRides = driver.recentRides?.filter((ride) => ride.isCompleted);

  if (!isFetched && isLoading) return <SpinnerLoader />;

  return (
    <div className={styles.completed_orders}>
      <Title order={4} className={styles.completed_orders_title}>
        Buyurtmalar tarixi
      </Title>
      <div className={styles.completed_orders_content}>
        {completedRides?.length > 0 ? (
          completedRides.map((item) => (
            <DriverRideCard key={item.id} data={item} />
          ))
        ) : (
          <div className={styles.empty_icon_wrapper}>
            <IconInbox className={styles.empty_icon} />
            <p className={styles.empty_subtitle}>Bajarilgan buyurtmalar yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedOrders;
