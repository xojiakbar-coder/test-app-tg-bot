import { useEffect, useState } from "react";

import { useRoutes } from "@/modules/routes/hooks";
import { useCreateRide, useDriver } from "@/modules/driver/hooks";

import * as Cards from "@/components/Cards";
import * as Icons from "@tabler/icons-react";

import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Placeholder } from "@/components/Placeholder";

// styles
import styles from "./Routes.module.scss";
import { storage } from "@/core/services";
import { Spinner } from "@/components/Spinner";

const DriverRoutes = () => {
  const [selectedItem, setSelectItem] = useState<number | null>(null);

  const { driver, isLoading } = useDriver();
  const { routes } = useRoutes();

  const { mutate, isPending } = useCreateRide();

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

  useEffect(() => {
    console.log(driver);
  }, [driver]);

  if (isLoading || driver.id === 0) return <Spinner />;

  if (activeRide && storage.local.get("driver") !== undefined) {
    return (
      <Placeholder
        icon={Icons.IconInfoCircle}
        title="Siz allaqachon aktiv navbatdasiz"
      />
    );
  }

  return (
    <div className={styles.container}>
      <Title>Yo‘nalishlar tanlang</Title>
      <div className={styles.card_wrapper}>
        {routes.map((item, index) => (
          <Cards.RoutesCard
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
              <Icons.IconNavigation />
              <b className={styles.selected_location_label}>Yo‘nalish:</b>
              {selectedItem !== null && routes[selectedItem]
                ? `${routes[selectedItem].start.name} - ${routes[selectedItem].finish.name}`
                : "Tanlanmagan"}
            </div>

            <Button
              height={40}
              color="red"
              w="max-content"
              variant="outline"
              className={styles.remove_btn}
              disabled={selectedItem == null}
              onClick={() => setSelectItem(null)}
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
