// styles
import styles from "./Routes.module.scss";

import { useNavigate } from "react-router-dom";
import { useRoutes } from "@/modules/routes/hooks";

import { storage } from "@/core/services";
import { Page } from "@/components/Page/Page";
import Title from "@/components/PageTitle/Title";
import Card from "@/components/Card/RoutesCard/RoutesCard";

export const PassengerRoutes = () => {
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
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {routes?.map((item) => (
          <Card
            id={item.id}
            key={item.id}
            start={item.start}
            finish={item.finish}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
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
    </div>
  );
};
