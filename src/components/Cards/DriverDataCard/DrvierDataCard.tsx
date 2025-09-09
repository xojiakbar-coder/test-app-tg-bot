import dayjs from "dayjs";
import { useEffect } from "react";
import * as Types from "@/modules/driver/types";

import CarData from "./CarData";
import { Badge, Box, Flex, Group, Stack, Text } from "@mantine/core";

import { IconCalendarCheck } from "@tabler/icons-react";

import styles from "./DrvierDataCard.module.scss";

const DrvierDataCard = ({ data }: { data: Types.IEntity.Driver }) => {
  useEffect(() => {}, [data.carModelName, data.carNumber, data.currentTariff]);

  return (
    <div className={styles.outer_container}>
      {data.currentTariff !== null && (
        <div className={styles.card}>
          <Stack gap={8}>
            <div className={styles.header}>
              <Box className={`${styles.icon_wrapper} ${styles["indigo"]}`}>
                <IconCalendarCheck className={styles.icon} color={"indigo"} />
              </Box>
              <Text size="xs" className={styles.title}>
                Faol tarif ma'lumotlari
              </Text>
            </div>
            <Flex direction="column">
              <Flex justify="space-between">
                <Group gap={7}>
                  <Text className={styles.label}>Nomi:</Text>
                  <Text className={styles.value}>
                    {data?.currentTariff.selectedTariff.name}
                  </Text>
                </Group>
                <Badge color="teal" mt={"8.3px"} className={styles.badge_label}>
                  Aktiv
                </Badge>
              </Flex>
              <Group gap={7}>
                <Text className={styles.label}>Muddati:</Text>
                <Text className={styles.value}>
                  {`${dayjs(data.currentTariff.tariffEnd).diff(
                    dayjs(),
                    "day"
                  )} kun qoldi`}
                </Text>
              </Group>
              <Group gap={7}>
                <Text className={styles.label}>Safarlar soni:</Text>
                <Text className={styles.value}>{data?.rideLimit}</Text>
              </Group>
              <Group gap={7}>
                <Text className={styles.label}>Balance:</Text>
                <Text className={styles.value}>{data?.balance}</Text>
              </Group>
            </Flex>
          </Stack>
        </div>
      )}

      {data.carModelName && data.carNumber && (
        <CarData carNumber={data.carNumber} carModelName={data.carModelName} />
      )}
    </div>
  );
};

export default DrvierDataCard;
