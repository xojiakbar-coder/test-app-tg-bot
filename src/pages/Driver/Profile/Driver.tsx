import { useNavigate } from "react-router-dom";

import { storage } from "@/core/services";
import { useDriver } from "@/modules/driver/hooks";

import * as Icons from "@tabler/icons-react";
import * as Cards from "@/components/Cards/DriverDataCard";

import { Avatar } from "@mantine/core";
import { Button } from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { Placeholder } from "@/components/Placeholder";

// styles
import styles from "./Driver.module.scss";

const Driver = () => {
  const user = storage.local.get("user");
  const navigate = useNavigate();
  const { driver, isLoading, isFetched } = useDriver();

  if (isFetched && !driver?.id) {
    return (
      <Placeholder
        title={`Sizning ma'lumotlaringiz topilmadi`}
        buttonContent="Biz bilan bog'lanish"
        externalLink="https://t.me/murodov_azizmurod"
        subtitle="Bu holat uchun biz bilan bog'lanishingiz mumkin."
      />
    );
  }

  if (isLoading && !isFetched) return <Spinner />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.header}>
          {user?.photoUrl && (
            <Avatar src={user.photoUrl} radius="xl" size="lg" />
          )}
          {!user?.photoUrl && (
            <Avatar radius="xl" size="lg" color="indigo">
              {user?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <h2 className={styles.name}>{user?.firstName}</h2>
        </div>

        {isFetched && driver?.id && <Cards.DrvierDataCard data={driver} />}

        <div className={styles.actions}>
          <a
            href="https://t.me/murodov_azizmurod"
            className={styles.contact_us}
          >
            <Button
              h={44}
              className={styles.button}
              leftSection={<Icons.IconPhoneCall size={16} />}
              gradient={{ from: "indigo", to: "blue", deg: 90 }}
            >
              Bog‘lanish
            </Button>
          </a>

          <Button
            h={44}
            className={styles.button}
            leftSection={<Icons.IconPlus size={20} />}
            onClick={() => navigate("/driver-change-tariff")}
            gradient={{ from: "indigo", to: "violet", deg: 90 }}
          >
            {driver?.currentTariff
              ? "Tarifni almashtirish"
              : "Tarif sotib olish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Driver;
