import styles from "./Driver.module.scss";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mantine/core";
import EmptyPage from "@/components/EmptyPage";
import Button from "@/components/Button/Button";
import { IconPhoneCall, IconPlus } from "@tabler/icons-react";
import SpinnerLoader from "@/components/Loader/Spinner";
import useDriver from "@/modules/driver/hooks/useDriver";
import { DrvierDataCard } from "@/components/Card/DriverDataCard";
import { getUserData } from "@/helpers";

const Driver = () => {
  const user = getUserData();
  const navigate = useNavigate();
  const { driver, isLoading, isFetched } = useDriver();

  if (isFetched && !driver?.id) {
    return (
      <EmptyPage
        title={`Sizning ma'lumotlaringiz topilmadi`}
        buttonContent="Biz bilan bog'lanish"
        externalLink="https://t.me/murodov_azizmurod"
        subtitle="Bu holat uchun biz bilan bog'lanishingiz mumkin."
      />
    );
  }

  if (isLoading && !isFetched) return <SpinnerLoader />;

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

        {isFetched && driver?.id && <DrvierDataCard data={driver} />}

        <div className={styles.actions}>
          <a
            href="https://t.me/murodov_azizmurod"
            className={styles.contact_us}
          >
            <Button
              h={44}
              className={styles.button}
              leftSection={<IconPhoneCall size={16} />}
              gradient={{ from: "indigo", to: "blue", deg: 90 }}
            >
              Bog‘lanish
            </Button>
          </a>

          <Button
            h={44}
            className={styles.button}
            leftSection={<IconPlus size={20} />}
            onClick={() => navigate("driver-driver-change-tariff")}
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
