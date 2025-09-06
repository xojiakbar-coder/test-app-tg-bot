import * as DriverType from '@/modules/order/types';
import type { TreeNodeData } from '@mantine/core';

export const transformBookingsToTreeData = (relatedRide: DriverType.IEntity.IRide): TreeNodeData[] => {
  return [
    {
      label: relatedRide.driver.fullName,
      value: `item-${relatedRide.id}`,
      children: [
        {
          label: `Mashina raqami: ${relatedRide.driver.carNumber}`,
          value: `date_of_departure-${relatedRide.id}`
        },
        {
          label: `Mashina turi: ${relatedRide.driver.carModelName}`,
          value: `car_type-${relatedRide.id}`
        },
        {
          label: `Telefon raqam: ${relatedRide.driver?.phoneNumber || 'Topilmadi'}`,
          value: `phone-${relatedRide.id}`
        }
      ]
    }
  ];
};
