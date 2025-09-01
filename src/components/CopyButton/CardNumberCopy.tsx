import styles from "./CardNumberCopy.module.scss";

import { IconCopy, IconCheck } from "@tabler/icons-react";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { success } from "../Notification";

const CardNumberCopy = ({
  cardNumber,
  description,
}: {
  cardNumber: string;
  description?: string;
}) => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.card_number}>{cardNumber}</span>

        <CopyButton value={cardNumber} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Nusxalandi!" : "Nusxalash"}
              withArrow
              position="right"
            >
              <ActionIcon
                onClick={() => {
                  copy();
                  success({ title: "Karta raqami nusxalandi!" });
                }}
                variant="gradient"
                gradient={{ from: "indigo", to: "violet", deg: 90 }}
              >
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </div>
      <p className={styles.description}>{description}</p>
    </>
  );
};

export default CardNumberCopy;
