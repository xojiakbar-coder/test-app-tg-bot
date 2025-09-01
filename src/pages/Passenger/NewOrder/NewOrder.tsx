import Form from "./components/Form";

import { Button } from "@/components/Button";
import styles from "./NewOrder.module.scss";
import Title from "@/components/PageTitle/Title";

import CreateForm from "@/modules/order/forms/Create";
import { success } from "@/components/Notification";

const NewOrder = () => {
  return (
    <div className={styles.container}>
      <Title>Buyurtma berish</Title>
      <CreateForm
        onSuccess={() =>
          success({ title: "Buyurtma muvaffaqiyatli yaratildi!" })
        }
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
