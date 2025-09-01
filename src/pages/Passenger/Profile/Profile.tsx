import styles from "./Profile.module.scss";

import { Avatar } from "@mantine/core";
import { Button } from "@/components/Button";

import { DataCard } from "@/components/Card/DataCard";
import SpinnerLoader from "@/components/Loader/Spinner";

import { usePassenger } from "@/modules/passenger/hooks";
import { getUserData } from "@/helpers";

const PassengerProfile = () => {
  const { photoUrl } = getUserData();
  const { data, isLoading } = usePassenger();

  if (isLoading) return <SpinnerLoader />;

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
        <Button variant="filled" className={styles.shareButton} h={44}>
          Do'stga promokod ulashish
        </Button>
      </a>
    </div>
  );
};

export default PassengerProfile;
