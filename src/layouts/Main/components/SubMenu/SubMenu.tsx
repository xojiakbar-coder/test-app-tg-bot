import styles from "./SubMenu.module.scss";
import * as Icons from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import { useDriverCheck } from "@/modules/driver/hooks";

const SubMenu = () => {
  const location = useLocation();
  const {
    data: { isDriver },
  } = useDriverCheck();

  const navItems = [
    {
      value: !isDriver ? "/" : "/driver-new-ride",
      icon: Icons.IconCirclePlus,
      label: "Yangi safar",
      activePaths: ["/", "/driver-new-ride"],
    },
    {
      value: !isDriver ? "/passenger-orders" : "/driver-rides",
      icon: Icons.IconCar,
      label: "Safarlarim",
      activePaths: ["/passenger-orders", "/driver-rides"],
    },
    {
      value: !isDriver ? "/passenger-archive" : "/driver-rides-archive",
      icon: Icons.IconArchive,
      label: "Archive",
      activePaths: ["/passenger-archive", "/driver-rides-archive"],
    },
    {
      value: !isDriver ? "/passenger-profile" : "/driver-profile",
      icon: Icons.IconUserCircle,
      label: "Profile",
      activePaths: ["/passenger-profile", "/driver-profile"],
    },
  ];

  return (
    <div className={styles.container}>
      {navItems.map(({ value, icon: Icon, label, activePaths }) => {
        const isActive = activePaths.includes(location.pathname);

        return (
          <NavLink
            key={value}
            to={value}
            className={`${styles.nav_link} ${isActive ? styles.active : ""}`}
          >
            <Icon className={styles.icon} />
            <span className={styles.label}>{label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SubMenu;
