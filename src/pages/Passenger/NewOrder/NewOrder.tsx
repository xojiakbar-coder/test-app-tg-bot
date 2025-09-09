import Form from "./components/Form";
import CreateForm from "@/modules/order/forms/Create";

import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { message } from "@/components/Message";

// styles
import styles from "./NewOrder.module.scss";

const NewOrder = () => {
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
