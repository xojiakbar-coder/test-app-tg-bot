import { IconCar } from "@tabler/icons-react";
import { Box, Flex, Group, Stack, Text } from "@mantine/core";

import styles from "./DrvierDataCard.module.scss";

const CarData = ({
  carNumber,
  carModelName,
}: {
  carNumber: string;
  carModelName: string;
}) => {
  return (
    <div className={styles.card}>
      <Stack gap={8}>
        <div className={styles.header}>
          <Box className={`${styles.icon_wrapper} ${styles["blue"]}`}>
            <IconCar className={styles.icon} color="blue" />
          </Box>
          <Text size="xs" className={styles.title}>
            Mashina ma'lumotlari
          </Text>
        </div>
        <Flex direction="column">
          <Group gap={7}>
            <Text className={styles.label}>Model:</Text>
            <Text className={styles.value}>{carModelName}</Text>
          </Group>
          <Group gap={7}>
            <Text className={styles.label}>Davlat raqami:</Text>
            <Text className={styles.value}>{carNumber}</Text>
          </Group>
        </Flex>
      </Stack>
    </div>
  );
};

export default CarData;
