import styles from "./DataCard.module.scss";
import * as Types from "@/modules/passenger/types";

import * as Icons from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Box,
  CopyButton,
  Flex,
  Stack,
  Text,
} from "@mantine/core";

const DataCard = ({ data }: { data: Types.IEntity.Passenger }) => {
  return (
    <div className={styles.outer_container}>
      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["blue"]}`}>
              <Icons.IconPhone
                className={styles.icon}
                color={"blue"}
                size={20}
              />
            </Box>
            <Text size="xs" className={styles.title}>
              Telefon raqam
            </Text>
          </div>
          <Text className={styles.value}>{data?.phoneNumber}</Text>
        </Stack>
      </div>

      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["green"]}`}>
              <Icons.IconCurrencyDollar
                size={20}
                color={"green"}
                className={styles.icon}
              />
            </Box>
            <Text size="xs" className={styles.title}>
              Cashback miqdori
            </Text>
          </div>
          <Text className={styles.value} component="div">
            <Badge color="teal">{data.cashbackAmount}</Badge>
          </Text>
        </Stack>
      </div>

      <div className={styles.card}>
        <Stack gap={8}>
          <div className={styles.header}>
            <Box className={`${styles.icon_wrapper} ${styles["pink"]}`}>
              <Icons.IconTag
                size={20}
                color={"#9c36b5"}
                className={styles.icon}
              />
            </Box>
            <Text size="xs" className={styles.title}>
              Shaxsiy promokod
            </Text>
          </div>
          <Flex justify={"space-between"} className={styles.promocode_copy}>
            <Text className={styles.value}>{data.promoCode}</Text>

            <CopyButton value={data.promoCode}>
              {({ copied, copy }) => (
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  onClick={copy}
                  classNames={{ root: styles.copy_button }}
                >
                  {copied ? (
                    <Icons.IconCheck size={16} />
                  ) : (
                    <Icons.IconCopy size={16} />
                  )}
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
