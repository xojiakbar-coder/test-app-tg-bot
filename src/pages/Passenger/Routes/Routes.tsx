// styles
import styles from "./Routes.module.scss";

import { useNavigate } from "react-router-dom";
import { useRoutes } from "@/modules/routes/hooks";

import { Space } from "@mantine/core";
import { storage } from "@/core/services";
import { Page } from "@/components/Page/Page";
import Title from "@/components/PageTitle/Title";
import SpinnerLoader from "@/components/Loader/Spinner";
import Card from "@/components/Card/RoutesCard/RoutesCard";

const PassengerRoutes = () => {
  const navigate = useNavigate();
  const { routes, isLoading, isFetching } = useRoutes();

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

  if (isLoading || isFetching) {
    return <SpinnerLoader />;
  }

  return (
    <Page back={false}>
      <Space h={"10px"} />
      <Title>Yo'nalishlar tanlang</Title>
      <div className={styles.card_wrapper}>
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>
    </Page>
  );
};

export default PassengerRoutes;
