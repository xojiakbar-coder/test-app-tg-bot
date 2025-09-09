import { useState } from 'react';
import { Image, Radio, Text } from '@mantine/core';

import comfortCar from '@/assets/images/comfort-car.webp';
import standartCar from '@/assets/images/standart-car.webp';
import bussinessCar from '@/assets/images/bussiness-car.webp';

import styles from './CarTypeCard.module.scss';

const PaymentCard = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className={styles.outer_container}>
      <Radio.Card
        value="Standart"
        onClick={() => setValue('Standart')}
        className={`${styles.container} ${value === 'Standart' && styles.active}`}
      >
        <Image src={standartCar} className={styles.car_photo} />
        <Text className={styles.content}>Standar</Text>
      </Radio.Card>

      <Radio.Card
        value="Comfort"
        onClick={() => setValue('Comfort')}
        className={`${styles.container} ${value === 'Comfort' && styles.active}`}
      >
        <Image src={comfortCar} className={styles.car_photo} />
        <Text className={styles.content}>Comfort</Text>
      </Radio.Card>

      <Radio.Card
        onClick={() => setValue('Biznes')}
        value="Biznes"
        className={`${styles.container} ${value === 'Biznes' && styles.active}`}
      >
        <Image src={bussinessCar} className={styles.car_photo} />
        <Text className={styles.content}>Biznes</Text>
      </Radio.Card>
    </div>
  );
};

export default PaymentCard;
