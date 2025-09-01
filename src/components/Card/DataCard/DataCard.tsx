import styles from "./DataCard.module.scss";
import * as Types from "@/modules/passenger/types";

import {
  IconBone,
  IconTag,
  IconCheck,
  IconCopy,
  IconPhone,
} from "@tabler/icons-react";
import { ActionIcon, Box, CopyButton, Flex, Stack, Text } from "@mantine/core";

const DataCard = ({ data }: { data: Types.IEntity.Passenger }) => {
  return (
    <div className={styles.outer_container}>
      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["blue"]}`}>
              <IconPhone className={styles.icon} color={"blue"} size={20} />
            </Box>
            <Text size="xs" className={styles.title}>
              Telefon raqam
            </Text>
          </div>
          <Text className={styles.value}>{data?.phoneNumber}</Text>
        </Stack>
      </div>

      <div className={styles.divider} />

      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["green"]}`}>
              <IconBone className={styles.icon} color={"green"} size={20} />
            </Box>
            <Text size="xs" className={styles.title}>
              Cashback miqdori
            </Text>
          </div>
          <Text className={styles.value}>{`${data.cashbackAmount} so‘m`}</Text>
        </Stack>
      </div>

      <div className={styles.divider} />

      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["pink"]}`}>
              <IconTag className={styles.icon} color={"#9c36b5"} size={20} />
            </Box>
            <Text size="xs" className={styles.title}>
              Shaxsiy promokod
            </Text>
          </div>
          <Flex justify={"space-between"} className={styles.promocode_copy}>
            <Text className={styles.value}>{data.promoCode}</Text>

            <CopyButton value={data.promoCode}>
              {({ copied, copy }) => (
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              )}
            </CopyButton>
          </Flex>
        </Stack>
      </div>
    </div>
  );
};

export default DataCard;
