import { useEffect } from "react";
import { isDriver } from "@/core/utils";
import styles from "./SubMenu.module.scss";
import * as Icons from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = () => {
  const driver = isDriver();
  const location = useLocation();

  useEffect(() => {
    console.log(driver);
  }, [driver]);

  const navItems = [
    {
      value: !driver ? "/" : "/driver/driver-new-ride",
      icon: Icons.IconCirclePlus,
      label: "Yangi buyurtma",
      activePaths: ["/", "/driver/driver-new-ride"],
    },
    {
      value: !driver ? "/passenger-orders" : "/driver/driver-orders",
      icon: Icons.IconShoppingCart,
      label: "Buyurtmalarim",
      activePaths: ["/passenger-orders", "/driver/driver-orders"],
    },
    {
      value: !driver ? "/passenger-profile" : "/driver",
      icon: Icons.IconUserCircle,
      label: "Profile",
      activePaths: ["/passenger-profile", "/driver"],
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
