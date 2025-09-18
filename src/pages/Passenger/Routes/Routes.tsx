import { storage } from "@/core/services";
import { useNavigate } from "react-router-dom";
import { useRoutes } from "@/modules/routes/hooks";

import { Title } from "@/components/Title";
import * as Cards from "@/components/Cards/";
import { Page } from "@/components/Page/Page";

// styles
import styles from "./Routes.module.scss";

const PassengerRoutes = () => {
  const navigate = useNavigate();
  const { routes, isLoading } = useRoutes();

  const handleCardClick = (id: number) => {
    navigate(`/passenger-new-order/${id}`);
    if (id) storage.local.set("routeId", id.toString());
  };

  if (routes.length === 0 && isLoading) {
    return (
      <Page back={false}>
        <Title>Yo'nalishlar mavjud emas</Title>
      </Page>
    );
  }

  return (
    <div className={styles.container}>
      <Title>Safar yo'nalishini tanlang</Title>
      <div className={styles.card_wrapper}>
        {routes?.map((item) => (
          <Cards.RoutesCard
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PassengerRoutes;
