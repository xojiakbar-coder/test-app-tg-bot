import styles from "../NewOrder.module.scss";

import * as Fields from "@/containers/Fields";

import { usePassenger } from "@/modules/passenger/hooks";

import { Input, Space, Badge } from "@mantine/core";
import { PaymentCard } from "@/components/Cards/PaymentCard";
import { CarTypeCard } from "@/components/Cards/CarTypeCard";

const Form = () => {
  const {
    data: { item },
  } = usePassenger();

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

      <Fields.RadioGroup name="carType" label="Mashina turi:" withAsterisk>
        <CarTypeCard />
      </Fields.RadioGroup>

      <Space h="lg" />

      <Fields.RadioGroup name="paymentType" label="To‘lov turi:" withAsterisk>
        <PaymentCard />
      </Fields.RadioGroup>

      <Space h="lg" />

      <Fields.Text
        name="extraLuggage"
        label="Qo‘shimcha yuk"
        placeholder="Qo‘shimcha yuk haqida yozing"
      />

      <Space h="lg" />

      <Input.Wrapper>
        <Fields.Text
          name="cashbackUsed"
          label="Cashback miqdori"
          placeholder={"0"}
          inputWrapperOrder={["label", "input", "description"]}
        />
        <Input.Description className={styles.cashback_mount} component={"div"}>
          Maximum cashback ishlatilishi:{" "}
          <Badge color="teal">{item.cashbackAmount}</Badge>
        </Input.Description>
      </Input.Wrapper>

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
