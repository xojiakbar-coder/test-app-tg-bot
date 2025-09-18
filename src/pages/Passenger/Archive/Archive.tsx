import styles from "./Archive.module.scss";
import Title from "@/components/Title/Title";
import { useList } from "@/modules/orders/hooks";

import * as Cards from "@/components/Cards";
import * as Icons from "@tabler/icons-react";
import { Spinner } from "@/components/Spinner";
import { Placeholder } from "@/components/Placeholder";

const Archive = () => {
  const { items, isLoading, isSuccess, isFetched } = useList();
  const completedRides = items?.filter((ride) => ride.relatedRide?.isCompleted);

  if (isLoading && isFetched) return <Spinner />;

  if (!isLoading && items.length === 0)
    return (
      <Placeholder internalLink="/" title="Hozircha arxiv safarlar yo'q" />
    );

  return (
    <div className={styles.container}>
      <Title>Arxiv safarlar ro'yxati</Title>
      <div className={styles.myOrdersWrapper}>
        {isSuccess && completedRides?.length > 0 ? (
          completedRides.map((item) => (
            <Cards.ArchiveOrderCard key={item.id} data={item} />
          ))
        ) : (
          <div className={styles.empty_icon_wrapper}>
            <Icons.IconInbox className={styles.empty_icon} />
            <p className={styles.empty_subtitle}>Bajarilgan buyurtmalar yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
