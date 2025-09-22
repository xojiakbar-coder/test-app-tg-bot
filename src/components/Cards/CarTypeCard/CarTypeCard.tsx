import { useState } from "react";
import { Image, Radio, Text } from "@mantine/core";

import comfortCar from "@/assets/images/comfort-car.webp";
import standartCar from "@/assets/images/standart-car.webp";
import bussinessCar from "@/assets/images/bussiness-car.webp";

// styles
import cx from "clsx";
import styles from "./CarTypeCard.module.scss";

const PaymentCard = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className={styles.outer_container}>
      <Radio.Card
        value="Standart"
        onClick={() => setValue("Standart")}
        className={cx(styles.container, value === "Standart" && styles.active)}
      >
        <Image
          src={standartCar}
          className={cx(styles.car_photo, styles.standart)}
        />
        <Text className={styles.content}>Standar</Text>
      </Radio.Card>

      <Radio.Card
        value="Comfort"
        onClick={() => setValue("Comfort")}
        className={cx(styles.container, value === "Comfort" && styles.active)}
      >
        <Image
          src={comfortCar}
          className={cx(styles.car_photo, styles.comfort)}
        />
        <Text className={styles.content}>Comfort</Text>
      </Radio.Card>

      <Radio.Card
        value="Biznes"
        onClick={() => setValue("Biznes")}
        className={cx(styles.container, value === "Biznes" && styles.active)}
      >
        <Image
          src={bussinessCar}
          className={cx(styles.car_photo, styles.bussiness)}
        />
        <Text className={styles.content}>Biznes</Text>
      </Radio.Card>
    </div>
  );
};

export default PaymentCard;
