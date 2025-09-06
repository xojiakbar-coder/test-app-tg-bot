import styles from "./Orders.module.scss";
import { useDelete, useList } from "@/modules/orders/hooks";

import EmptyPage from "@/components/EmptyPage";
import SpinnerLoader from "@/components/Loader/Spinner";
import { OrderCard } from "@/components/Card/OrderCard";
import Title from "@/components/PageTitle/Title";
import Page from "@/components/Page";

const PassengerOrders = () => {
  const { items, isLoading, isSuccess, isFetched } = useList();
  const { mutate } = useDelete();

  if (isLoading && isFetched) return <SpinnerLoader />;

  if (!isLoading && items.length === 0)
    return <EmptyPage internalLink="/" title="Hozircha safarlar yo‘q" />;

  return (
    <div className={styles.container}>
      <Title>Buyurtmalaringiz ro'yxati</Title>
      <div className={styles.myOrdersWrapper}>
        {isSuccess &&
          items.length > 0 &&
          items.map((item) => {
            return <OrderCard key={item.id} data={item} mutation={mutate} />;
          })}
      </div>
    </div>
  );
};

export default PassengerOrders;
