import { useEffect } from "react";
import { isDriver } from "@/core/utils";
import styles from "./SubMenu.module.scss";
import * as Icons from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = () => {
  const driver = isDriver();
  const location = useLocation();

  useEffect(() => {}, [driver]);

  const navItems = [
    {
      value: !isDriver ? "/" : "/driver/new-order",
      icon: Icons.IconCirclePlus,
      label: "Yangi buyurtma",
      activePaths: ["/", "/driver/new-order"],
    },
    {
      value: !isDriver ? "my-orders" : "/driver/my-orders",
      icon: Icons.IconShoppingCart,
      label: "Buyurtmalarim",
      activePaths: ["/my-orders", "/driver/my-orders"],
    },
    {
      value: !isDriver ? "/profile" : "/driver",
      icon: Icons.IconUserCircle,
      label: "Profile",
      activePaths: ["/profile", "/driver"],
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
