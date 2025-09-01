import { useEffect } from "react";
import styles from "./MyOrders.module.scss";

import { useDriver } from "@/modules/driver/hooks";
import useDeleteRide from "@/modules/driver/hooks/useDelete";

import EmptyPage from "@/components/EmptyPage";
import CompletedOrders from "./CompletedOrders";
import Title from "@/components/PageTitle/Title";
import SpinnerLoader from "@/components/Loader/Spinner";
import DriverRideCard from "@/components/Card/DriverRideCard/DriverRideCard";

const MyOrders = () => {
  const { mutate } = useDeleteRide();
  const { driver, isLoading, isFetched } = useDriver();

  const activeRide = driver.recentRides?.find(
    (ride) => ride.isCompleted == false
  );

  useEffect(() => {
    driver.recentRides.find((item) => item.isCompleted === false);
  }, [driver]);

  if (isFetched && driver.recentRides.length === 0) {
    return (
      <EmptyPage
        internalLink="/driver/new-order"
        title="Hozircha aktiv navbat yo‘q"
        buttonContent="Yangi buyurtma qo‘shish"
      />
    );
  }

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className={styles.my_orders_wrapper}>
      <Title>Buyurtmalar ro'yxati</Title>

      <div className={styles.sections_wrapper}>
        {activeRide ? (
          <div className={styles.active_order_card}>
            <DriverRideCard data={activeRide} mutation={mutate} />
          </div>
        ) : (
          <div className={styles.no_active_ride}>
            <p>Hozircha aktiv navbat yo‘q</p>
          </div>
        )}
        <CompletedOrders />
      </div>
    </div>
  );
};

export default MyOrders;
