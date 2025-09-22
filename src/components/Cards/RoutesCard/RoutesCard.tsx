import clsx from "clsx";
import styles from "./RoutesCard.module.scss";
import * as Types from "@/modules/routes/types";

import * as Icons from "@tabler/icons-react";

const RoutesCard = ({
  start,
  finish,
  onClick,
  active = false,
  className = "",
}: Types.IEntity.RoutesCardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(styles.routes_card, className, active && styles.active)}
    >
      {/* Start Location */}
      <div className={styles.start_location}>
        <span>Jo‘nash manzili</span>
        <span>{start.name}</span>
      </div>

      {/* Arrow */}
      <div className={styles.arrow}>
        <Icons.IconArrowNarrowRight />
      </div>

      {/* Finish Location */}
      <div className={styles.finish_location}>
        <span>Borish manzili</span>
        <span>{finish.name}</span>
      </div>
    </div>
  );
};

export default RoutesCard;
