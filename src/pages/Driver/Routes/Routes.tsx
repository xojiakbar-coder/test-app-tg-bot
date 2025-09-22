import { useState } from "react";

import { useRoutes } from "@/modules/routes/hooks";
import { useCreateRide, useDriver } from "@/modules/driver/hooks";

import * as Cards from "@/components/Cards";

import { Input } from "@mantine/core";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { message } from "@/components/Message";

// styles
import styles from "./Routes.module.scss";

const DriverRoutes = () => {
  const [item, setItem] = useState<number | null>(null);
  const { driver, isLoading: isDriverLoading } = useDriver();
  const { routes: route, isLoading: isRoutesLoading } = useRoutes();
  const { mutate, isPending } = useCreateRide();

  const routeItem = route.find((v) => v.id === item);
  const active = driver?.recentRides?.find((item) => !item.isCompleted);

  const onSubmit = () => {
    if (!!active) {
      message.warning({ title: "Sizda faol navbat mavjud", autoClose: 1700 });
    }

    if (driver?.id && item !== null && !active && routeItem) {
      mutate({
        driverId: driver.id.toString(),
        routeId: routeItem.id,
      });
    }
  };

  // console.log(route);

  if (isDriverLoading || isRoutesLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <Title>Yo‘nalishlar tanlang</Title>

      <div className={styles.card_wrapper}>
        {route.map((v) => {
          return (
            <Cards.RoutesCard
              id={v.id}
              key={v.id}
              start={v.start}
              finish={v.finish}
              onClick={() => setItem(v.id)}
              active={!!item && routeItem?.id === v.id}
            />
          );
        })}
      </div>

      {route.length > 0 && (
        <>
          <Input
            readOnly
            value={
              !!item && !!routeItem?.id
                ? `${routeItem?.start.name} - ${routeItem?.finish.name}`
                : ""
            }
            placeholder="Tanlanmagan"
            rightSectionPointerEvents="auto"
            className={styles.selected_location}
            rightSection={
              !!item && <Input.ClearButton onClick={() => setItem(null)} />
            }
          />

          <Button
            full
            onClick={onSubmit}
            loading={isPending}
            disabled={item === null || isPending}
          >
            {isPending ? "Qo‘shilmoqda..." : "Navbatga Qo‘shish"}
          </Button>
        </>
      )}
    </div>
  );
};

export default DriverRoutes;
