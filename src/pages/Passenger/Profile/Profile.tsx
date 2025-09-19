import styles from "./Profile.module.scss";

import { Avatar } from "@mantine/core";
import { Button } from "@/components/Button";

import { Spinner } from "@/components/Spinner";
import { DataCard } from "@/components/Cards/DataCard";

import { usePassenger } from "@/modules/passenger/hooks";
import { storage } from "@/core/services";

const PassengerProfile = () => {
  const { photoUrl } = storage.local.get("user");
  const { data, isLoading } = usePassenger();

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {photoUrl && <Avatar src={photoUrl} radius="xl" size="lg" />}
        {!photoUrl && (
          <Avatar radius="xl" size="lg" color="blue">
            {data?.item.name.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <h2 className={styles.passengerfullName}>{data?.item.name || ""}</h2>
      </div>

      <DataCard data={data.item} />

      <a
        className={styles.cashbackShare}
        href={`https://t.me/share/url?url=https://t.me/pitakuzrobot?start=${data?.item?.promoCode}&text=Link ustiga bosing va mening promokodim orqali cashback oling`}
      >
        <Button size="sm" variant="light">
          Do'stga promokod ulashish
        </Button>
      </a>
    </div>
  );
};

export default PassengerProfile;
