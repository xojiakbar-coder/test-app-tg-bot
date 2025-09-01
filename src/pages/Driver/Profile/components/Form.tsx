// styles
import styles from "../Driver.module.scss";

import * as Fields from "@/containers/Fields";

// hooks
import { useList } from "@/modules/tariff/hooks";
import { useDriver } from "@/modules/driver/hooks";

// components
import { Badge, Group, Text } from "@mantine/core";
import { Spacer } from "@/components/Spacer/Spacer";
import SpinnerLoader from "@/components/Loader/Spinner";
import CardNumberCopy from "@/components/CopyButton/CardNumberCopy";

const Form = () => {
  const { driver } = useDriver();
  const { items, isLoading, isSuccess } = useList();

  if (isLoading && !isSuccess) return <SpinnerLoader />;

  return (
    <>
      <Text className={styles.form_title}>
        Tarif {driver.currentTariff != null ? "almashtirish" : "sotib olish"}
      </Text>

      <Spacer size="lg" />

      <CardNumberCopy
        cardNumber="9860 1766 1378 8965"
        description="Tarif to'lovini ushbu kartaga o'tkazishingiz mumkin"
      />

      <Spacer size="lg" />

      <Fields.Select
        name="selectedTariff"
        label="Tarif tanlang"
        className={styles.fields}
        placeholder="Tarif tanlanlash"
        data={items.map((tariff) => ({
          value: String(tariff.id),
          label: tariff.name,
        }))}
      />

      <Spacer size="md" />

      <Fields.File
        clearable
        className={styles.fields}
        accept="image/png,image/jpeg"
        name="tariffPaymentScreenshot"
        label="To'lov skrinshotini yuklang"
        placeholder="To'lov skrinshotni yuklash"
      />

      <Spacer size="md" />

      {items.map((tariff) => {
        return (
          <div key={tariff.id}>
            <Group mb="sm" align="center" gap={2}>
              <Text fw={600} size="sm" c="dark">
                Tarif nomi: {tariff.name}
              </Text>
              <Badge color="blue" variant="light" my="xs">
                {tariff.price.toLocaleString()} so‘m
              </Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Amal qilish muddati: {tariff.durationDays} kun
            </Text>
            <Text size="sm" c="dimmed">
              Yo‘lga chiqish limiti: {tariff.rideLimit} ta safar
            </Text>
            <Text size="sm" c="dimmed">
              Komissiya: {tariff.comission} %
            </Text>
          </div>
        );
      })}

      <Text c="dimmed" size="sm" my="lg">
        Eslatma: Tarif to'lovini amalga oshirgandan so'ng, to'lov skrinshotini
        yuqoridagi maydonga yuklang va saqlang. Ma'muriyat to'lovni
        tasdiqlagandan so'ng, sizning tarifingiz faollashtiriladi yoki
        yangilanadi.
      </Text>
    </>
  );
};

export default Form;
