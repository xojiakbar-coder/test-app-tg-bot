import { Button } from "@/components/Button";

import styles from "./Driver.module.scss";

import Form from "./components/Form";
import Page from "@/components/Page";

import { message } from "@/components/Message";
import CreateForm from "@/modules/driver/forms/Create";

const DriverChangeTariff = () => {
  return (
    <Page>
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
                  <Button full effective htmlType="submit" disabled={isLoading}>
                    {isLoading ? "Yuborilmoqda..." : "Yuborish"}
                  </Button>
                </>
              );
            }}
          </CreateForm>
        </div>
      </div>
    </Page>
  );
};

export default DriverChangeTariff;
