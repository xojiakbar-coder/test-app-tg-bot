import { useState } from "react";
import styles from "./Routes.module.scss";
import { useNavigate } from "react-router-dom";
import { useRoutes } from "@/modules/routes/hooks";
import { useCreateRide, useDriver } from "@/modules/driver/hooks";

import { Button } from "@/components/Button";
import EmptyPage from "@/components/EmptyPage";
import Title from "@/components/PageTitle/Title";
import SpinnerLoader from "@/components/Loader/Spinner";
import { IconInfoCircle, IconNavigation } from "@tabler/icons-react";
import RoutesCard from "@/components/Card/RoutesCard/RoutesCard";

const DriverRoutes = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectItem] = useState<number | null>(null);

  const { driver, isFetched } = useDriver();
  const { routes, isLoading } = useRoutes();

  // ✅ navigate callbackni shu yerda beramiz
  const { mutate, isPending } = useCreateRide({
    onSuccess: () => {
      navigate("/driver/my-orders");
    },
  });

  const activeRide = driver?.recentRides.find(
    (item) => item.isCompleted === false
  );

  const onSubmit = () => {
    if (driver?.id && selectedItem !== null) {
      mutate({
        driverId: driver.id.toString(),
        routeId: routes[selectedItem].id,
      });
    }
  };

  if (isFetched && activeRide) {
    return (
      <EmptyPage
        icon={IconInfoCircle}
        title="Siz allaqachon aktiv navbatdasiz"
      />
    );
  }

  if (isLoading || !isFetched) return <SpinnerLoader />;

  return (
    <div className={styles.container}>
      <Title>Yo‘nalishlar tanlang</Title>
      <div className={styles.card_wrapper}>
        {routes.map((item, index) => (
          <RoutesCard
            key={item.id}
            id={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => setSelectItem(index)}
            className={
              selectedItem !== null && routes[selectedItem].id === item.id
                ? styles.selected
                : ""
            }
          />
        ))}
      </div>

      {routes.length > 0 && (
        <>
          <div className={styles.selected_text_wrapper}>
            <div
              className={`${styles.selected_location} ${
                selectedItem !== null &&
                routes[selectedItem] &&
                styles.selected_location_active
              }`}
            >
              <IconNavigation />
              <b className={styles.selected_location_label}>Yo‘nalish:</b>
              {selectedItem !== null && routes[selectedItem]
                ? `${routes[selectedItem].start.name} - ${routes[selectedItem].finish.name}`
                : "Tanlanmagan"}
            </div>

            <Button
              height={40}
              w="max-content"
              className={styles.remove_btn}
              disabled={selectedItem == null}
              onClick={() => setSelectItem(null)}
              variant="gradient"
              gradient={{ from: "red", to: "pink", deg: 90 }}
            >
              Olib tashlash
            </Button>
          </div>

          <Button
            height={46}
            type="button"
            onClick={onSubmit}
            className={styles.button}
            disabled={selectedItem === null || isPending}
          >
            {isPending ? "Qo‘shilmoqda..." : "Navbatga Qo‘shish"}
          </Button>
        </>
      )}
    </div>
  );
};
export default DriverRoutes;
