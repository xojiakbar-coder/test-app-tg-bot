import { Button } from "@/components/Button";

import styles from "./Driver.module.scss";

import Form from "./components/Form";
import CreateForm from "@/modules/driver/forms/Create";
import { message } from "@/components/Message";

const DriverChangeTariff = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <CreateForm
          onSuccess={() => {
            message.success("Tarifini yangilash uchun so'rov yuborildi !");
          }}
        >
          {({ isLoading }) => {
            return (
              <>
                <Form />
                <Button
                  type="submit"
                  variant="filled"
                  h={46}
                  disabled={isLoading}
                  className={styles.submit_button}
                >
                  {isLoading ? "Yuborilmoqda..." : "Yuborish"}
                </Button>
              </>
            );
          }}
        </CreateForm>
      </div>
    </div>
  );
};

export default DriverChangeTariff;
