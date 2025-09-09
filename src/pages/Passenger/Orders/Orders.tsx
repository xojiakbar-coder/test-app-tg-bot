import { useDelete, useList } from "@/modules/orders/hooks";

import { Title } from "@/components/Title";
import { Spinner } from "@/components/Spinner";
import * as Cards from "@/components/Cards/OrderCard";
import { Placeholder } from "@/components/Placeholder";

// styles
import styles from "./Orders.module.scss";

const PassengerOrders = () => {
  const { items, isLoading, isSuccess, isFetched } = useList();
  const { mutate } = useDelete();

  if (isLoading && isFetched) return <Spinner />;

  if (!isLoading && items.length === 0)
    return <Placeholder internalLink="/" title="Hozircha safarlar yo‘q" />;

  return (
    <div className={styles.container}>
      <Title>Buyurtmalaringiz ro'yxati</Title>
      <div className={styles.myOrdersWrapper}>
        {isSuccess &&
          items.length > 0 &&
          items.map((item) => {
            return (
              <Cards.OrderCard key={item.id} data={item} mutation={mutate} />
            );
          })}
      </div>
    </div>
  );
};

export default PassengerOrders;
