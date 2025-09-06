import Form from "./components/Form";

import { Button } from "@/components/Button";
import styles from "./NewOrder.module.scss";
import Title from "@/components/PageTitle/Title";

import { useEffect } from "react";
import { message } from "@/components/Message";
import CreateForm from "@/modules/order/forms/Create";
import { backButton, useSignal, mainButton } from "@telegram-apps/sdk-react";

const NewOrder = () => {
  const isVisible = useSignal(backButton.isVisible);

  useEffect(() => {}, [isVisible]);

  useEffect(() => {
    mainButton.text();
    return () => {
      backButton.hide();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Title>Buyurtma berish</Title>
      <CreateForm
        onSuccess={() => message.success("Buyurtma muvaffaqiyatli yaratildi.")}
      >
        {({ isLoading }) => {
          return (
            <>
              <Form />
              <Button
                type="submit"
                variant="filled"
                height={46}
                disabled={isLoading}
                className={styles.submit_button}
              >
                {isLoading ? "Yuborilmoqda..." : "Buyurtma berish"}
              </Button>
            </>
          );
        }}
      </CreateForm>
    </div>
  );
};

export default NewOrder;
