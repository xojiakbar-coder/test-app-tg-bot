import styles from "../NewOrder.module.scss";

import * as Fields from "@/containers/Fields";

import { usePassenger } from "@/modules/passenger/hooks";

import { Space } from "@mantine/core";
import { PaymentCard } from "@/components/Cards/PaymentCard";
import { CarTypeCard } from "@/components/Cards/CarTypeCard";

const Form = () => {
  return (
    <>
      <Fields.DateTimePickerInput
        withAsterisk
        name="dateOfDeparture"
        label="Jo‘nash sanasi"
        classNames={{ placeholder: styles.date_field_pl }}
        placeholder="Jo‘nash sanasini belgilang"
      />

      <Space h="md" />

      <Fields.TimeInput
        withAsterisk
        label="Jo‘nash vaqti"
        name="timeOfDeparture"
        placeholder="Jo‘nash vaqtini belgilang"
      />

      <Space h="md" />

      <Fields.RadioGroup name="carType" label="Mashina turi:" withAsterisk>
        <CarTypeCard />
      </Fields.RadioGroup>

      <Space h="md" />

      <Fields.RadioGroup name="paymentType" label="To‘lov turi:" withAsterisk>
        <PaymentCard />
      </Fields.RadioGroup>

      <Space h="md" />

      <Fields.Text
        name="extraLuggage"
        label="Qo‘shimcha yuk"
        placeholder="Qo‘shimcha yuk haqida yozing"
      />

      <Space h="md" />

      <div className={styles.row_wrapper}>
        <Fields.Chip
          name="isCashbackUsed"
          classNames={{ label: styles.chip_label }}
        >
          Keshbekni ishlatish
        </Fields.Chip>
        <Fields.Chip name="frontSeat" classNames={{ label: styles.chip_label }}>
          Oldingi o‘rindiqni band qilish
        </Fields.Chip>
      </div>

      <Space h="md" />
    </>
  );
};

export default Form;
