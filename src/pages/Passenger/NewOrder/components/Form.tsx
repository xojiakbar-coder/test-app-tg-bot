import styles from "../NewOrder.module.scss";

import * as Fields from "@/containers/Fields";

import { PaymentCard } from "@/components/Cards/PaymentCard";
import { CarTypeCard } from "@/components/Cards/CarTypeCard";
import { Space } from "@mantine/core";

const Form = () => {
  return (
    <>
      <Fields.DateTimePickerInput
        withAsterisk
        name="dateOfDeparture"
        label="Jo‘nash sanasi"
        placeholder="Jo‘nash sanasini belgilang"
      />

      <Space h="lg" />

      <Fields.TimeInput
        withAsterisk
        label="Jo‘nash vaqti"
        name="timeOfDeparture"
        placeholder="Jo‘nash vaqtini belgilang"
      />

      <Space h="lg" />

      <Fields.RadioGroup name="carType" label="Mashina turi:">
        <CarTypeCard />
      </Fields.RadioGroup>

      <Space h="lg" />

      <Fields.RadioGroup name="paymentType" label="To‘lov turi:">
        <PaymentCard />
      </Fields.RadioGroup>

      <Space h="lg" />

      <Fields.Text
        name="extraLuggage"
        label="Qo‘shimcha yuk"
        placeholder="Qo‘shimcha yuk haqida yozing"
      />

      <Space h="lg" />

      <div className={styles.row_wrapper}>
        <Fields.Chip name="isCashbackUsed" color="teal">
          Keshbekni ishlatish
        </Fields.Chip>
        <Fields.Chip name="frontSeat" color="teal">
          Oldingi o‘rindiqni band qilish
        </Fields.Chip>
      </div>

      <Space h="lg" />
    </>
  );
};

export default Form;
